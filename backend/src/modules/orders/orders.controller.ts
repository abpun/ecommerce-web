import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('pagination')
  async getOrdersByPagination(@Query() query: any) {
    console.log(query);
    return this.orderService.getOrdersByPagination(query);
  }

  @Get(':userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.getOrderByUserId(userId);
  }

  @Post('')
  async createOrder(@Body() data: any) {
    const order = await this.orderService.createOrder(data);
    return { order: order, message: 'Order created successfully', status: 201 };
  }
}
