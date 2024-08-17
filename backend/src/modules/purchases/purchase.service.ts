import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from 'src/schemas/purchase.schema';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel('Purchase') private readonly purchaseModel: Model<Purchase>,
  ) {}

  async fetchPurchases(): Promise<Purchase[]> {
    const purchases = await this.purchaseModel.find();
    if (!purchases) throw new Error('Purchases not found');
    return purchases;
  }
}
