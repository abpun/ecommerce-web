import { Schema } from 'mongoose';

export const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  { timestamps: true },
);
