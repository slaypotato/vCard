import {
  Body,
  Headers,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserLoginDto } from '../shared/dtos/user-login.dto';
import { UserRegisterDto } from '../shared/dtos/user-register.dto';
import { UserHeaderDto } from '../shared/dtos/user-header.dto';
import { UserCognitoDto } from '../shared/dtos/user-cognito.dto';
import { TokenDto } from '../shared/dtos/token.dto';
import { AuthGuard } from '../cloudTools/auth/auth.guard';

@Controller('/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiResponse({ status: 200, description: 'Running Test' })
  @Get('/')
  listAll(): string {
    return `The app is running!! Check API documentation for correct endpoints`;
  }

  @ApiResponse({
    status: 200,
    description: 'Current User Information',
    type: UserCognitoDto,
  })
  @Get('current')
  @UseGuards(AuthGuard)
  async getUserInfo(@Headers() header: UserHeaderDto): Promise<UserCognitoDto> {
    console.log(header);
    return await this.service.getUserInfo(header.authorization);
  }

  @ApiResponse({
    status: 200,
    description: 'Return Login Token',
    type: TokenDto,
  })
  @Post('login')
  async login(@Body() loginRequest: UserLoginDto): Promise<TokenDto> {
    return await this.service.login(loginRequest);
  }

  @ApiResponse({ status: 201, description: 'New User Registration' })
  @Post('register')
  async register(@Body() registerRequest: UserRegisterDto): Promise<any> {
    return await this.service.register(registerRequest);
  }
}
