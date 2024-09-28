import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('pagination')
  async getOrdersByPagination(@Body() query: any) {
    return this.orderService.getOrdersByPagination(query);
  }

  @Post('')
  async createOrder(@Body() data: any) {
    const order = await this.orderService.createOrder(data);
    return { order: order, message: 'Order created successfully', status: 201 };
  }
}
