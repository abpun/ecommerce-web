import { Schema, Document } from 'mongoose';

export interface UserProduct extends Document {
  userId: string;
  productId: string;
  isLiked: boolean;
  isViewed: boolean;
  isPurchased: boolean;
  score: number;
}

export const UserProductSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    isPurchased: { type: Boolean, default: false },
    isLiked: { type: Boolean, default: false },
    isViewed: { type: Boolean, default: false },
    score: { type: Number, required: true },
  },
  { timestamps: true },
);
