import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async createOrder(@Body() data: any) {
    const order = await this.orderService.createOrder(data);
    return { order: order, message: 'Order created successfully', status: 201 };
  }
}
