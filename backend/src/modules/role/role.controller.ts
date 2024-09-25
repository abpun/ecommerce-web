import { Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly authService: RoleService) {}

  @Post('seed_role')
  async seedRoles() {
    return await this.authService.insertRoles();
  }
}
