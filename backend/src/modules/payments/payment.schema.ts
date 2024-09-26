import { Schema } from 'mongoose';

export interface Payment {
  amount: number;
  pidx: string;
  tidx?: string | null;
  userId: string;
  orderId: string;
  status?: string;
}

export const PaymentSchema = new Schema(
  {
    amount: { type: String, required: true },
    pidx: { type: String, required: true },
    tidx: { type: String, required: false },
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },
  {
    timestamps: true,
  },
);
