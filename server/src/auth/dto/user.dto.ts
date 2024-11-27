import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The unique username of the user',
    example: 'username123',
  })
  userName: string;

  @ApiProperty({
    description: 'The role ID associated with the user',
    example: 'role_id_123',
  })
  roleId: string;

  @ApiProperty({ description: 'The status of the user', example: 'active' })
  status: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;
}
