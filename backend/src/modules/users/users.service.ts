import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private userModel: Model<User>) {}

  async getUserById(id: ObjectId) {}
}
