import { model } from 'mongoose';
import { Purchase as PurchaseInterface } from './purchase.interface';
import { PurchaseSchema } from 'src/schemas/purchase.schema';

export const PurchaseModel = model<PurchaseInterface>(
  'Purchase',
  PurchaseSchema,
);
