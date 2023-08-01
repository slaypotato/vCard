import { ApiProperty } from '@nestjs/swagger';

export class UserCognitoDto {
  @ApiProperty()
  sub: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiProperty()
  iss: string;

  @ApiProperty()
  'cognito:username': string;

  @ApiProperty()
  'preferred_username'?: string;

  @ApiProperty()
  origin_jti: string;

  @ApiProperty()
  aud: string;

  @ApiProperty()
  event_id?: string;

  @ApiProperty()
  token_use: string;

  @ApiProperty()
  auth_time: number;

  @ApiProperty()
  exp: number;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  jti: string;

  @ApiProperty()
  email?: string;
}
