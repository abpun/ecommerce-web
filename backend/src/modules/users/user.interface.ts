import { Document, ObjectId } from 'mongoose';

export interface Role {
  _id: ObjectId;
  name: string;
}

export interface User extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
}
