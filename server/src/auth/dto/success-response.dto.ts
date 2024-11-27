import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    description: 'Request successful or not',
    example: true,
    type: Boolean,
    required: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    type: String,
    example: 'Request was successful',
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
