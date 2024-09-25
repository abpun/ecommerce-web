import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserProductService } from './user_product.service';

@Controller('user_product')
export class UserProductController {
  constructor(private readonly interactionService: UserProductService) {}

  @Post('add')
  async addInteraction(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('interactionType') interactionType: string,
  ) {
    return this.interactionService.addInteraction(
      userId,
      productId,
      interactionType,
    );
  }

  @Get(':userId/top')
  async getTopProductsByUser(@Param('userId') userId: string) {
    return this.interactionService.getTopProductsByUser(userId);
  }
}
