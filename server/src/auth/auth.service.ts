import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { IResponse } from 'src/utils/response/response.type';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from 'src/utils/response/response.service';
import { UsersQueryService } from 'src/users/users-query/users-query.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordHashService: PasswordHashService,
    private readonly responseService: ResponseService,
    private readonly jwtService: JwtService,
    private readonly usersQueryService: UsersQueryService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto): Promise<IResponse> {
    const checkEmail = await this.usersQueryService.findUserByEmail(
      loginUserDto.email,
    );

    if (!checkEmail) throw new BadRequestException('Wrong email or password');

    const passCheck = await this.passwordHashService.validatePassword(
      loginUserDto.password,
      checkEmail.password,
    );

    if (!passCheck) throw new BadRequestException('Wrong email or password');

    let token = this.jwtService.sign({
      id: checkEmail.id,
      role: checkEmail.role.name,
    });

    return this.responseService.response(true, 'User logged-in successfully', {
      user: checkEmail,
      token,
    });
  }
}
