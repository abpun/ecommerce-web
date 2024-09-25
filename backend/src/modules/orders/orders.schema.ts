import { Schema } from 'mongoose';

interface OrderedItem {
  productId: string;
  quantity: number;
}

export interface Order extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  ordered_items: OrderedItem[];
  total: number;
  payment_method: string;
  status: string;
}

export const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    ordered_items: { type: Array, required: true },
    total: { type: Number, default: 0 },
    payment_method: { type: String, default: 'cash' },
    payment_status: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
  },
  {
    timestamps: true,
  },
);
