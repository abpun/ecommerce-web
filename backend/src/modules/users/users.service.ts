import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User } from '../users/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUserById(id: ObjectId) {}

  async fetchUsersByPagination(query: any): Promise<any> {
    const { limit, page } = query;

    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;

    const totalDocuments = await this.userModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / perPage);

    const users = await this.userModel
      .find({})
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate('role');

    if (!users || users.length === 0) {
      throw new NotFoundException('users not found');
    }

    return {
      currentPage,
      totalPages,
      totalDocuments,
      limit: perPage,
      data: users,
    };
  }
}
