import { ApiProperty } from '@nestjs/swagger';
import { UserTokenDto } from './user-token.dto';

export class VerifyOtpResponseDto {
  @ApiProperty({
    description: 'Request successful or not',
    example: true,
    type: Boolean,
    required: true,
    default: true,
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
    description: 'The Response payload',
    required: true,
    type: UserTokenDto,
  })
  payload: UserTokenDto;
}
