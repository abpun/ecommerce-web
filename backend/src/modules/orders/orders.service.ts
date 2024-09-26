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
      return acc + parseInt((item.price * item.quantity * 100).toFixed(0));
    }, 0);

    const orderName = `ECOM_${Date.now()}`;

    return await this.orderModel.create({
      ...data,
      total,
      order_name: orderName,
      ordered_items: orders,
    });
  }
}
