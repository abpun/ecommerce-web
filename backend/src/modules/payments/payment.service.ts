import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Payment } from './payment.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') private paymentModel: Model<Payment>,
    @InjectModel('Order') private orderModel: Model<any>,
  ) {}

  async getRoleById(id: ObjectId) {}

  async create(payment: Payment): Promise<Payment> {
    const createdPayment = new this.paymentModel(payment);
    return createdPayment.save();
  }

  async update(id: string, payment: Payment): Promise<Payment> {
    const doc = await this.paymentModel.findOne({ orderId: id });

    if (!doc) {
      throw new Error('Payment not found');
    }

    if (doc.pidx !== payment.pidx) {
      throw new Error('transaction id does not match');
    }

    const updated = await this.paymentModel.findOneAndUpdate(
      { orderId: id },
      { ...payment, status: 'completed' },
      {
        new: true,
      },
    );

    if (!updated) {
      throw new Error('Payment not updated');
    }

    const updatedOrder = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { status: 'completed' },
      {
        new: true,
      },
    );

    return updated;
  }
}
