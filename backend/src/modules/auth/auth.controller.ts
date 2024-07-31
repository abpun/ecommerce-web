import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';
import { validateSync } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() body: any) {
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
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((err) => Object.values(err.constraints)).flat(),
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
}
