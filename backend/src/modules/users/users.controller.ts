import { Body, Controller, Get, Query } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('pagination')
  async getUsersByPagination(@Query() query: any) {
    // console.log(query);
    return this.userService.fetchUsersByPagination(query);
  }
}
