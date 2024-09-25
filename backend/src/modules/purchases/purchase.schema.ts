import { Schema } from 'mongoose';

export const PurchaseSchema = new Schema(
  {
    purchasedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);
