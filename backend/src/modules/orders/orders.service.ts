import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Order } from './orders.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async getOrderById(id: ObjectId) {}

  async getOrdersByPagination(query: any) {
    const { limit, page } = query;

    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;

    const totalDocuments = await this.orderModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / perPage);

    const orders = await this.orderModel
      .find({})
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate('userId');

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found');
    }

    return {
      currentPage,
      totalPages,
      totalDocuments,
      limit: perPage,
      data: orders,
    };
  }

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
