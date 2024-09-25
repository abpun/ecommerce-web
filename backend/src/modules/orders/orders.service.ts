import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Order } from './orders.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async getOrderById(id: ObjectId) {}

  async createOrder(data: any) {
    const orders = data.cartItems.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const total = data.cartItems.reduce((acc: number, item: any) => {
      return acc + item.price * item.quantity;
    }, 0);

    return await this.orderModel.create({
      ...data,
      total,
      ordered_items: orders,
    });
  }
}
