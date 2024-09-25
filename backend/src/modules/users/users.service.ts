import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User } from '../users/user.interface';

@Injectable()
export class UserService {
  constructor(private userModel: Model<User>) {}

  async getUserById(id: ObjectId) {}
}
