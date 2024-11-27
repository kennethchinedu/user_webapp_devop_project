import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: '10',
    description: 'Data limit',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiProperty({
    example: '1',
    description: 'Data page',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  page?: string;
}
