import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Product as ProductType } from './product.model';
import { GetProductsQueryDto } from './product.dto';
import { JwtAuthGuard } from 'src/services/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllProducts(
    @Query() query: GetProductsQueryDto,
    @Req() req: Request,
  ): Promise<Product[]> {
    console.log(req.user);
    return this.productService.fetchProducts(query);
  }

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

  @Post('bulk')
  async addManyProducts(): Promise<Product[]> {
    const res = await this.productService.addManyProducts([]);
    if (!res) throw new Error('Products not added');
    return res;
  }
}
