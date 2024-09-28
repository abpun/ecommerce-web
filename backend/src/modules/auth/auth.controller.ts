import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';
import { validateSync } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() body: any) {
    // console.log(body);
    const requiredFields = ['name', 'email', 'password'];
    const missingFields = requiredFields.filter(
      (field) => !body.hasOwnProperty(field),
    );

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Missing required fields: ${missingFields.join(', ')}`,
      );
    }

    const createUserDto = new CreateUserDto();
    createUserDto.name = body.name;
    createUserDto.email = body.email;
    createUserDto.password = body.password;

    const errors = validateSync(createUserDto);
    console.log(errors);
    if (errors.length > 0) {
      const parsedErrors = errors.reduce((acc, err) => {
        acc[err.property] = Object.values(err.constraints)[0];
        return acc;
      }, {});

      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors: parsedErrors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.register(createUserDto);
  }

  @Post('signin')
  async login(@Body() body: any) {
    const requiredFields = ['email', 'password'];
    const missingFields = requiredFields.filter(
      (field) => !body.hasOwnProperty(field),
    );
    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Missing required fields: ${missingFields.join(', ')}`,
      );
    }
    return this.authService.login(body);
  }

  @Post('adminlogin')
  async adminLogin(@Body() body: any) {
    const requiredFields = ['email', 'password'];
    const missingFields = requiredFields.filter(
      (field) => !body.hasOwnProperty(field),
    );
    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Missing required fields: ${missingFields.join(', ')}`,
      );
    }
    return this.authService.adminLogin(body);
  }
}
