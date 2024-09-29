import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductsQueryDto } from './product.dto';
import { HttpService } from '@nestjs/axios';
import { UserProduct } from '../user_product/user_product.model';
import { UploadService } from 'src/services/upload';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService {
  private readonly apiUrl = 'https://dummyjson.com/products?limit=194';
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('UserProduct')
    private readonly interactionModel: Model<UserProduct>,
    private readonly httpService: HttpService,
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async getFromApi() {
    const response = await this.httpService.get(this.apiUrl).toPromise();
    return response.data;
  }

  async fetchProducts(query: GetProductsQueryDto): Promise<Product[]> {
    const products = await this.productModel.aggregate([{ $sample: { size: parseInt(query.limit) ?? 10 } }]);
    if (!products) throw new NotFoundException('Products not found');
    return products;
  }

  async fetchProductsByPagination(query: any): Promise<any> {
    const { limit, page } = query;

    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;

    const totalDocuments = await this.productModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / perPage);

    const products = await this.productModel
      .find({})
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return {
      currentPage,
      totalPages,
      totalDocuments,
      limit: perPage,
      data: products,
    };
  }

  async searchProducts(query: any): Promise<Product[]> {
    const { q: searchText } = query;
    const products = await this.productModel.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: searchText, $options: 'i' } },
            { description: { $regex: searchText, $options: 'i' } },
          ],
        },
      },
      {
        $addFields: {
          titleMatch: {
            $cond: {
              if: {
                $regexMatch: {
                  input: '$title',
                  regex: searchText,
                  options: 'i',
                },
              },
              then: 1,
              else: 0,
            },
          },
          titlePriority: {
            $cond: {
              if: {
                $regexMatch: {
                  input: '$title',
                  regex: searchText,
                  options: 'i',
                },
              },
              then: {
                $indexOfCP: [{ $toLower: '$title' }, searchText.toLowerCase()],
              },
              else: -1,
            },
          },
        },
      },

      {
        $sort: {
          titleMatch: -1,
          titlePriority: 1,
          _id: 1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    if (!products.length) throw new NotFoundException('Products not found');
    return products;
  }

  async getByCategories(category: string): Promise<Product[]> {
    const products = await this.productModel.find({ category });
    if (!products) throw new Error('Products not found');

    return products;
  }

  async findProductById(id: string, projection: string[] = []): Promise<Product | null> {
    const product = await this.productModel.findById(id, projection);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async addProduct(productData: Product): Promise<Product> {
    try {
      let imageUrls: string[] = [];

      if (productData.images && productData.images.length > 0) {
        imageUrls = await Promise.all(
          productData.images.map(async file => {
            const uploadedImageUrl = await this.uploadService.uploadFile(file);
            return uploadedImageUrl;
          })
        );
        productData.images = imageUrls;
      }

      productData.thumbnail = imageUrls[0] || '';
      productData.returnPolicy = '30 days';
      productData.brand = 'default brand';
      productData.reviews = [];
      productData.availabilityStatus = productData.stock > 0 ? 'In Stock' : 'Out of Stock';
      productData.rating = 0;

      const createdProduct = await this.productModel.create(productData);
      if (!createdProduct) throw new Error('Product not added');

      return createdProduct;
    } catch (error) {
      // console.log(error);
      throw new Error(`Error adding product: ${error.message}`);
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) throw new Error('Product not deleted');
    return deletedProduct;
  }

  async addManyProducts(products: Product[]): Promise<Product[]> {
    const res = await this.productModel.insertMany(products);
    if (!res) throw new Error('Products not added');
    return;
  }

  async getRelatedProduct(id: string): Promise<Product[]> {
    const product = await this.findProductById(id);
    const relatedProducts = await this.productModel
      .find({
        category: product.category,
        _id: { $ne: id },
      })
      .limit(20);
    if (!relatedProducts) throw new Error('Related products not found');

    return this.getRandomProducts(relatedProducts, 4);
  }

  async recommendByContent(userId: string): Promise<Product[]> {
    const threshold = 0.3;
    const interactions = await this.interactionModel
      .find({ userId })
      .sort({ updatedAt: -1, score: -1 })
      .limit(4)
      .populate('productId')
      .exec();

    const userProducts = interactions.map(interaction => {
      if (!interaction.productId) {
        throw new NotFoundException('Product not found');
      }
      return interaction.productId;
    });

    const allProducts = await this.productModel.find().exec();

    const recommendedProducts = allProducts.filter(product => {
      const similarityScore = this.calculateSimilarity(userProducts, product);
      return similarityScore > threshold;
    });

    return this.getRandomProducts(recommendedProducts, 4);
  }

  // fisher yates algorithm
  getRandomProducts(products: any[], count: number) {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }

    return products.slice(0, count);
  }

  calculateSimilarity(userProducts, product) {
    let count = 0;
    let totalSimilarity = 0;
    const categoryStrength = 0.4;
    const tagStrength = 0.3;
    const priceStrength = 0.3;

    userProducts.forEach(userProduct => {
      const categorySimilarity = this.calculateCategorySimilarity(userProduct.category, product.category);
      const tagSimilarity = this.calculateTagSimilarity(userProduct.tags, product.tags);
      const priceSimilarity = this.calculatePriceSimilarity(userProduct.price, product.price);
      if (categorySimilarity > 0 || tagSimilarity > 0 || priceSimilarity > 0) {
        totalSimilarity +=
          categoryStrength * categorySimilarity + tagStrength * tagSimilarity + priceStrength * priceSimilarity;
        count++;
      }
    });

    return totalSimilarity;
  }

  // Normalized difference
  calculateCategorySimilarity(category1, category2) {
    return category1 === category2 ? 1 : 0;
  }

  // jaccard similarity
  calculateTagSimilarity(tags1, tags2) {
    const intersection = tags1.filter(tag => tags2.includes(tag)).length;
    const union = new Set([...tags1, ...tags2]).size;
    return intersection / union;
  }

  // binary comparison
  calculatePriceSimilarity(price1, price2) {
    const maxPrice = Math.max(price1, price2);
    const minPrice = Math.min(price1, price2);
    return 1 - (maxPrice - minPrice) / maxPrice;
  }
}
