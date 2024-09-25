import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Role } from './role.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel: Model<Role>) {}

  async getRoleById(id: ObjectId) {}

  async insertRoles() {
    const roles = [
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ];

    return await this.roleModel.insertMany(roles);
  }
}
