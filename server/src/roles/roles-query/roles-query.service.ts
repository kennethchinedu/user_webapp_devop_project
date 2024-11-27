import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRoles() {
    return this.prismaService.role.findMany({
      where: {
        deleted: false,
      },
    });
  }
}
