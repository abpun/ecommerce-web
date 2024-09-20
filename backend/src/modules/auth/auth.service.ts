import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDto, LoginUserDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      role: 'user',
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
      throw new InternalServerErrorException(
        'Error saving user to the database',
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<object> {
    const { email, password } = loginUserDto;

    let user: User | null;
    try {
      user = await this.userModel.findOne({ email }).exec();
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

    const payload = { email: user.email, id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return {
      access_token: token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
