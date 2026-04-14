import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  async getUserDetails(@Param('id') userId: string) {
    return this.userService.getUserDetails(userId);
  }
}
