import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: 'j.oyafemi@gmail.com',
    description: 'The email of the user',
    required: true,
    uniqueItems: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '101010',
    description: 'The otp',
    required: true,
    type: String,
  })
  @IsString({ message: 'otp must be a string' })
  @IsNotEmpty()
  otp: string;
}
