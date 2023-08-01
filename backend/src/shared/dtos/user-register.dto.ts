import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
