import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Product } from './products.entity';

@Injectable()
export class ProductService {
  private readonly apiUrl = 'https://dummyjson.com/products';

  constructor(private readonly httpService: HttpService) {}

  async fetchProducts(): Promise<Product[]> {
    const response: AxiosResponse<{ products: Product[] }> =
      await this.httpService.get(this.apiUrl).toPromise();
    return response.data.products;
  }
}
