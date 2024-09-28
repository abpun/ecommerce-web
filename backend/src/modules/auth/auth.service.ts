import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/user.interface';
import { Role } from '../role/role.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Role') private roleModel: Model<Role>,
  ) {}

  async validateUser(id: ObjectId): Promise<any> {
    const user = await this.userModel.findById(id).select('-password -__v');
    if (!user) return null;
    return user;
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Validation failed',
          errors: {
            email: 'Email already exists',
          },
        },
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const role = await this.roleModel.findOne({ name: 'user' });

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      role: role._id,
    });

    try {
      const user = await createdUser.save();
      if (!user) {
        throw new HttpException('Error', HttpStatus.OK);
      }
      return {
        message: 'User registerd',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error saving user to the database',
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<object> {
    const { email, password } = loginUserDto;

    let user: User | null;
    try {
      user = await this.userModel.findOne({ email }).populate('role').exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error checking for existing user',
      );
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role?.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return {
      status: 200,
      access_token: token,
      user: payload,
    };
  }

  async adminLogin(loginUserDto: LoginUserDto): Promise<object> {
    const { email, password } = loginUserDto;
    let user: User | null;
    try {
      user = await this.userModel.findOne({ email }).populate('role').exec();
      if (!user) {
        throw new NotFoundException('User or email not found');
      }

      // console.log(user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid || user.role?.name !== 'admin') {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role?.name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return {
        status: 200,
        access_token: token,
        user: payload,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error checking for existing user',
      );
    }
  }
}
