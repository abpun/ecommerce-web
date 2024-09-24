import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductsQueryDto } from './product.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class ProductService {
  private readonly apiUrl = 'https://dummyjson.com/products';
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
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
}
