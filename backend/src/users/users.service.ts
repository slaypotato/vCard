import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../cloudTools/auth/auth.service';
import { UserLoginDto } from '../shared/dtos/user-login.dto';
import { UserRegisterDto } from '../shared/dtos/user-register.dto';
import { UserCognitoDto } from '../shared/dtos/user-cognito.dto';
import { TokenDto } from '../shared/dtos/token.dto';

@Injectable()
export class UsersService {
  constructor(private readonly auth: AuthService) {}
  async login(userLogin: UserLoginDto): Promise<TokenDto> {
    try {
      const user = await this.auth.authenticateUser(userLogin);
      return { token: user.idToken.jwtToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(newUser: UserRegisterDto) {
    try {
      const user = await this.auth.registerUser(newUser);
      return `User ${user.username} Created Successfully`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserInfo(jwtToken: string): Promise<UserCognitoDto> {
    try {
      const token = jwtToken ? jwtToken.replace('Bearer ', '') : '';
      const user = await this.auth.getUserInfo(token);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
