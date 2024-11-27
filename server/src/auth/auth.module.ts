import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ResponseService } from 'src/utils/response/response.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/utils/env';
import { UsersModule } from 'src/users/users.module';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ResponseService, PasswordHashService],
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET as string,
      signOptions: { expiresIn: 60 * 60 },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
