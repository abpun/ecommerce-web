import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductsQueryDto } from './product.dto';
import { HttpService } from '@nestjs/axios';
import { UserProduct } from '../user_product/user_product.model';

@Injectable()
export class ProductService {
  private readonly apiUrl = 'https://dummyjson.com/products?limit=194';
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('UserProduct')
    private readonly interactionModel: Model<UserProduct>,
    private readonly httpService: HttpService,
  ) {}

  async getFromApi() {
    const response = await this.httpService.get(this.apiUrl).toPromise();
    return response.data;
  }

  async fetchProducts(query: GetProductsQueryDto): Promise<Product[]> {
    const products = await this.productModel.aggregate([
      { $sample: { size: parseInt(query.limit) ?? 10 } },
    ]);
    if (!products) throw new Error('Products not found');

    return products;
  }

  async findProductById(
    id: string,
    projection: string[] = [],
  ): Promise<Product | null> {
    const product = await this.productModel.findById(id, projection);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async addProduct(product: Product): Promise<Product> {
    const res = await this.productModel.create(product);
    if (!res) throw new Error('Product not added');
    return;
  }

  async addManyProducts(products: Product[]): Promise<Product[]> {
    const res = await this.productModel.insertMany(products);
    if (!res) throw new Error('Products not added');
    return;
  }

  async recommendByContent(userId: string): Promise<Product[]> {
    const threshold = 0.3;
    const interactions = await this.interactionModel
      .find({ userId })
      .sort({ score: -1, updatedAt: -1 })
      .limit(10)
      .populate('productId')
      .exec();

    const userProducts = interactions.map(
      (interaction) => interaction.productId,
    );

    const allProducts = await this.productModel.find().exec();

    const recommendedProducts = allProducts.filter((product) => {
      const similarityScore = this.calculateSimilarity(userProducts, product);
      return similarityScore > threshold;
    });

    return this.getRandomProducts(recommendedProducts, 4);
  }

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

    userProducts.forEach((userProduct) => {
      const categorySimilarity = this.calculateCategorySimilarity(
        userProduct.category,
        product.category,
      );
      const tagSimilarity = this.calculateTagSimilarity(
        userProduct.tags,
        product.tags,
      );
      const priceSimilarity = this.calculatePriceSimilarity(
        userProduct.price,
        product.price,
      );
      if (categorySimilarity > 0 || tagSimilarity > 0 || priceSimilarity > 0) {
        totalSimilarity +=
          categoryStrength * categorySimilarity +
          tagStrength * tagSimilarity +
          priceStrength * priceSimilarity;
        count++;
      }
    });

    return totalSimilarity;
  }

  calculateCategorySimilarity(category1, category2) {
    return category1 === category2 ? 1 : 0;
  }

  calculateTagSimilarity(tags1, tags2) {
    const intersection = tags1.filter((tag) => tags2.includes(tag)).length;
    const union = new Set([...tags1, ...tags2]).size;
    return intersection / union;
  }

  calculatePriceSimilarity(price1, price2) {
    const maxPrice = Math.max(price1, price2);
    const minPrice = Math.min(price1, price2);
    return 1 - (maxPrice - minPrice) / maxPrice;
  }
}
