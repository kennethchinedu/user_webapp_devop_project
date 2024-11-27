import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersQueryService } from './users-query/users-query.service';
import { PrismaService } from 'src/prisma.service';
import { ResponseService } from 'src/utils/response/response.service';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersQueryService,
    PrismaService,
    ResponseService,
    PasswordHashService,
  ],
  exports: [UsersQueryService],
})
export class UsersModule {}
