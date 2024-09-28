import { ObjectId } from 'mongoose';

export interface Role {
  _id: ObjectId;
  name: string;
}

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
}
