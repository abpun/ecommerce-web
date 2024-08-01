import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async fetchProducts(limit: number = 10): Promise<Product[]> {
    const products = await this.productModel.aggregate([
      { $sample: { size: limit } },
    ]);
    if (!products) throw new Error('Products not found');

    return products;
  }

  async findProductById(
    id: string,
    projection: string[] = [],
  ): Promise<Product | null> {
    const product = await this.productModel.findOne({ id }, projection);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async addProduct(product: Product): Promise<Product> {
    const res = await this.productModel.create(product);
    if (!res) throw new Error('Product not added');
    return;
  }

  async addManyProducts(products: Product[]): Promise<Product[]> {
    const res = await this.productModel.bulkSave(products);
    if (!res) throw new Error('Products not added');
    return;
  }
}
