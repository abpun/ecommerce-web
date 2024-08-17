import { Document } from 'mongoose';

export interface Purchase extends Document {
  id: number;
  user_id: string;
  product_id: string;
  purchase_date: string;
}
