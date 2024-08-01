// src/products/product.schema.ts
import { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const DimensionSchema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
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
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: { type: DimensionSchema, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [ReviewSchema], required: true },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  meta: {
    createdAt: { type: String },
    updatedAt: { type: String },
    barcode: { type: String },
    qrCode: { type: String },
  },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
});
