import { Controller, Get } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getRecommendations(): Promise<Product[]> {
    const products = await this.productService.fetchProducts();
    if (!products) {
      throw new Error('Products not found');
    }
    const lowPriceThreshold = 20;
    const highDiscountThreshold = 15;
    const highRatingThreshold = 4.0;

    // Filter products based on criteria
    const recommendedProducts = products
      .filter((product) => product.stock > 0)
      .map((product) => ({
        ...product,
        score:
          (product.price < lowPriceThreshold ? 1 : 0) +
          (product.discountPercentage > highDiscountThreshold ? 1 : 0) +
          (product.rating > highRatingThreshold ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return recommendedProducts;
  }
}
