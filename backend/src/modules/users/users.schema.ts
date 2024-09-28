import { Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
});
