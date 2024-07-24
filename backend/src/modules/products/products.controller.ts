import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  findAll(): string {
    return 'This action returns all products';
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    return `Product ${id}`
  }
}
