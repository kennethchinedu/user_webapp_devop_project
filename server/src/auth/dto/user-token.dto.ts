import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserTokenDto {
  @ApiProperty({
    example: '',
    description: 'The Response payload',
    required: true,
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({
    description: 'The jwt token',
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    required: true,
  })
  token: string;
}
