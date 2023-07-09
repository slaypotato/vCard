import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('/users')
@ApiTags('Users')
@ApiResponse({ status: 200, description: '' })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/')
  listAll(): string {
    return `The app is running!!`;
  }
}
