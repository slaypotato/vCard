import { ApiProperty } from '@nestjs/swagger';

export class UserHeaderDto {
  @ApiProperty({ required: true })
  authorization: string;

  @ApiProperty()
  'user-agent'?: string;

  @ApiProperty()
  accept?: string;

  @ApiProperty()
  'postman-token'?: string;

  @ApiProperty()
  host?: string;

  @ApiProperty()
  'accept-encoding'?: string;

  @ApiProperty()
  connection?: string;
}
