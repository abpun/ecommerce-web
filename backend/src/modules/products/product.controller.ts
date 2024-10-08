import { Request } from 'express';
import { ProductService } from './product.service';
import { Product as ProductType } from './product.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetProductsQueryDto } from './product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() query: GetProductsQueryDto, @Req() req: Request): Promise<ProductType[]> {
    // console.log(req.user);
    return this.productService.fetchProducts(query);
  }

  @Get('pagination')
  async getProductsByPagination(@Query() query: any) {
    return this.productService.fetchProductsByPagination(query);
  }

  @Get('category/:name')
  async getProductsByCategory(@Param('name') category: string) {
    if (!category) throw new NotFoundException('Category not found');
    const products = this.productService.getByCategories(category);
    if (!products) throw new NotFoundException('Category not found');
    return products;
  }

  @Get('search')
  async searchProducts(@Query() query: object) {
    return this.productService.searchProducts(query);
  }

  @Get('addproduct')
  async addProductDb() {
    try {
      const data = await this.productService.getFromApi();
      this.productService.addManyProducts(data.products);

      return {
        message: 'Products added successfully',
        data: data.products,
      };
    } catch (error) {
      // console.log(error);
    }
  }

  getUniqueCategoriesCount = products => {
    const uniqueCategories = [];

    products.forEach(product => {
      if (!uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
      }
    });

    return uniqueCategories;
  };

  @Get('related/:id')
  async getRelatedProducts(@Param('id') id: string) {
    let products: any;
    if (id) {
      products = await this.productService.getRelatedProduct(id);
    }

    if (!products) return { message: 'No related products' };
    return products;
  }

  @Get('recommend/:id')
  async getRecommendation(@Param('id') id: string) {
    let products: any;
    if (id) {
      products = await this.productService.recommendByContent(id);
    } else {
      products = await this.productService.fetchProducts({ limit: '10' });
    }
    if (!products) return { message: 'No recommendations' };
    else return products;
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductType> {
    const product = await this.productService.findProductById(id);
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(@Body() body: any, @UploadedFiles() files: Express.Multer.File[]): Promise<any> {
    const productData = {
      ...body,
      images: files,
    };
    const product = await this.productService.addProduct(productData);
    return {
      status: 201,
      message: 'Product created successfully',
      data: product,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ProductType> {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Post('bulk')
  async addManyProducts(): Promise<ProductType[]> {
    const res = await this.productService.addManyProducts([]);
    if (!res) throw new Error('Products not added');
    return res;
  }
}
