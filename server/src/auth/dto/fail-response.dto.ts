import { ApiProperty } from '@nestjs/swagger';

export class FailResponseDto {
  @ApiProperty({
    description: 'Request successful or not',
    example: false,
    type: Boolean,
    required: true,
    default: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    type: String,
    example: 'Request failed',
    required: true,
  })
  message: string;

  @ApiProperty({
    example: '',
    description: 'The Request payload',
    required: true,
    type: '',
  })
  payload: string;
}
