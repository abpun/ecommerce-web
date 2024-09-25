import { Document } from 'mongoose';

export interface Role extends Document {
  name: string;
}
