import { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

export const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },
  brand: { type: String },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [ReviewSchema], required: true },
  returnPolicy: { type: String, required: true },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
});
