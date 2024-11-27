import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserType } from '../types/create-user-type';
import { User } from '@prisma/client';
import { EditUserDto } from '../dto/edit-user.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class UsersQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
        deleted: false,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findUserByUserName(userName: string) {
    return await this.prismaService.user.findUnique({
      where: {
        userName,
        deleted: false,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findUserById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
        deleted: false,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createUser(data: CreateUserType) {
    return await this.prismaService.user.create({
      data,
    });
  }

  async editUser(id: string, data: Partial<User>) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: { ...data, updatedAt: new Date(Date.now()) },
    });
  }

  async findAllUsers(paginationDto: PaginationDto) {
    const limit = paginationDto.limit ? paginationDto.limit : 10;
    const page = paginationDto.page ? paginationDto.page : 1;
    const offset = (Number(page) - 1) * Number(limit);

    const totalUsers = await this.prismaService.user.count({
      where: { deleted: false },
    });

    const users = await this.prismaService.user.findMany({
      skip: offset,
      take: Number(limit),
      where: { deleted: false },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      data: users,
      total: totalUsers,
      page,
      limit,
      totalPages: Math.ceil(totalUsers / Number(limit)),
    };
  }
}
