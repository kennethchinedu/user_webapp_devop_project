import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesQueryService } from './roles-query/roles-query.service';
import { PrismaService } from 'src/prisma.service';
import { ResponseService } from 'src/utils/response/response.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RolesQueryService, PrismaService, ResponseService],
  imports: [UsersModule],
})
export class RolesModule {}
