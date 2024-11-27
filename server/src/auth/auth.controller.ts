import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/custom-decorators/public-route.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { VerifyOtpResponseDto } from './dto/verify-otp-response.dto';
import { FailResponseDto } from './dto/fail-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IResponse } from 'src/utils/response/response.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiOkResponse({
    status: 200,
    description: 'User logged-in successfully',
    type: VerifyOtpResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to login user',
    type: FailResponseDto,
  })
  @ApiBody({ type: LoginUserDto })
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<IResponse> {
    return await this.authService.loginUser(loginUserDto);
  }
}
