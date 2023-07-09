import { AuthConfig } from './auth.config';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { UserLoginDto } from 'src/shared/dtos/user-login.dto';
import { UserAuthReturn } from './dtos/user-auth-return.dto';
import { UserRegisterDto } from 'src/shared/dtos/user-register.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(@Inject(AuthConfig) private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  async registerUser({ user, email, password }: UserRegisterDto): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        user,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (error, result) => {
          if (!result) {
            reject(error);
          } else {
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

    Logger.log(`User: ${user}, Pass: ${password}`);

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

  async handlePasswordChange(cognitoUser, newPassword): Promise<any> {
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
