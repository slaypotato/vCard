import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfig {
  constructor(private readonly config: ConfigService) {}
  public userPoolId: string = this.config.get<string>('COGNITO_USER_POOL_ID');
  public clientId: string = this.config.get<string>('COGNITO_CLIENT_ID');
  public region: string = this.config.get<string>('COGNITO_REGION');
  public authority = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;
}
