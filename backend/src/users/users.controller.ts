import { Body, Controller, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserByID(@Param() { id }:any): Promise<any> {
    Logger.log(`Attempting to search for user: ${id}`)
    return this.usersService.searchUserById(id);
  }

  @Post()
  async postNewUser(@Body() data:any ): Promise<any> {
    return this.usersService.createNewUser(data);
  }

  @Put(':id')
  async putUpdateUser(@Param() { id }:any , @Body() user:any): Promise<any> {
    return this.usersService.updateUser(id, user);
  }
}
