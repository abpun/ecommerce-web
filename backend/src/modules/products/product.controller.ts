import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Product as ProductType } from './product.model';
// import { JwtAuthGuard } from 'src/services/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.fetchProducts();
  }

  // Get a single product by ID
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.findProductById(id);
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  @Post()
  async createProduct(@Body() createProductDto: ProductType): Promise<Product> {
    return this.productService.addProduct(createProductDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getRecommendations(): Promise<Product[]> {
    const products = await this.productService.fetchProducts();
    if (!products) throw new Error('Products not found');

    return products;
  }

  @Post()
  async addManyProducts(): Promise<Product[]> {
    const res = await this.productService.addManyProducts([]);
    if (!res) throw new Error('Products not added');
    return res;
  }
}
