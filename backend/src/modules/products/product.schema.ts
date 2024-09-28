import { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

export const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  tags: { type: [String] },
  brand: { type: String },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [ReviewSchema], default: [] },
  returnPolicy: { type: String, default: '30 days' },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
});
