import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/shared/dtos/user-login.dto';
import { UserRegisterDto } from 'src/shared/dtos/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authenticateRequest: UserLoginDto) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('register')
  async register(@Body() userRegisterRequest: UserRegisterDto) {
    try {
      return await this.authService.registerUser(userRegisterRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('validate')
  async validate(@Body() { token }: any) {
    return await this.authService.validateUser(token);
  }
}
