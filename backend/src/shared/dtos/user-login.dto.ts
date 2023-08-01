import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  password: string;
}
