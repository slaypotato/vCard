import { AuthConfig } from './auth.config';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { UserLoginDto } from '../../shared/dtos/user-login.dto';
import { UserAuthReturn } from '../../shared/dtos/user-auth-return.dto';
import { UserRegisterDto } from '../../shared/dtos/user-register.dto';
import { UserRegisterReturn } from '../../shared/dtos/user-register-return.dto';
import { UserCognitoDto } from 'src/shared/dtos/user-cognito.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(@Inject(AuthConfig) private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async registerUser({
    user,
    email,
    password,
  }: UserRegisterDto): Promise<UserRegisterReturn | any> {
    const emailAttribute = new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    });
    const usernameAttribute = new CognitoUserAttribute({
      Name: 'preferred_username',
      Value: user,
    });
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        user,
        password,
        [emailAttribute, usernameAttribute],
        null,
        (error, result) => {
          if (!result) {
            Logger.error('Registration Failed', error);
            reject(error);
          } else {
            Logger.log('Registration Successfull');
            resolve(result.user);
          }
        },
      );
    });
  }

  async authenticateUser({
    user,
    password,
  }: UserLoginDto): Promise<UserAuthReturn | any> {
    const authDetail = new AuthenticationDetails({
      Username: user,
      Password: password,
    });

    const newCognitoUser = new CognitoUser({
      Username: user,
      Pool: this.userPool,
    });

    //Logger.log(`User: ${user}, Pass: ${password}`);

    return new Promise((resolve, reject) => {
      return newCognitoUser.authenticateUser(authDetail, {
        onSuccess: (result) => {
          Logger.log('Login Success');
          resolve(result);
        },
        onFailure: (err) => {
          Logger.error('Login Fail', err);
          reject(err);
        },
        newPasswordRequired: async (userAttributes) => {
          delete userAttributes.email_verified;
          return await this.handlePasswordChange(newCognitoUser, password);
        },
      });
    });
  }

  async validateUser(jwtToken: string) {
    // Verifier that expects valid access tokens:
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.authConfig.userPoolId,
      tokenUse: null,
      clientId: this.authConfig.clientId,
    });

    try {
      const payload = await verifier.verify(jwtToken);
      Logger.log('Token is valid. username:', payload.sub);
      return true;
    } catch {
      Logger.error('Token not valid!');
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserInfo(jwtToken: string): Promise<UserCognitoDto> {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.authConfig.userPoolId,
      tokenUse: null,
      clientId: this.authConfig.clientId,
    });

    try {
      const payload = await verifier.verify(jwtToken);
      Logger.log('Token is valid. username:', payload.sub);
      return payload;
    } catch {
      Logger.error('Token not valid!');
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private async handlePasswordChange(cognitoUser, newPassword): Promise<any> {
    return new Promise((resolve, reject) => {
      return cognitoUser.completeNewPasswordChallenge(
        newPassword,
        {},
        {
          onSuccess: (result) => {
            Logger.log('Password Challenge Success');
            resolve(result);
          },
          onFailure: (err) => {
            Logger.error('Password Challenge Fail', err);
            reject(err);
          },
        },
      );
    });
  }
}
