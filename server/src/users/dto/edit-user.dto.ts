import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    description: 'The role ID associated with the user',
    example: 'role_id_123',
    type: String,
  })
  @IsString()
  @IsOptional()
  roleId?: string;

  @ApiProperty({
    description: 'The status of the user',
    example: 'active',
    type: String,
  })
  @IsString()
  @IsOptional()
  status?: string;
}
