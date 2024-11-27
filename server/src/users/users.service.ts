import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseService } from 'src/utils/response/response.service';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { UsersQueryService } from './users-query/users-query.service';
import { EditUserDto } from './dto/edit-user.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly passwordHashService: PasswordHashService,
    private readonly usersQueryService: UsersQueryService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...item } = createUserDto;

    const checkEmail = await this.usersQueryService.findUserByEmail(item.email);

    if (checkEmail)
      throw new BadRequestException('A user with this email already exist');

    const checkUserName = await this.usersQueryService.findUserByUserName(
      item.userName,
    );

    if (checkUserName)
      throw new BadRequestException('A user with this userName already exist');

    const hashedPassword =
      await this.passwordHashService.hashPassword(password);

    const user = await this.usersQueryService.createUser({
      ...item,
      password: hashedPassword,
    });

    return this.responseService.response(true, 'User created successfully', {
      user,
    });
  }

  async editUser(userId: string, editUserDto: EditUserDto) {
    const user = await this.usersQueryService.editUser(userId, editUserDto);

    if (!user) throw new UnprocessableEntityException('Error editing user');

    return this.responseService.response(true, 'User edited successfully', {
      user,
    });
  }

  async deleteUser(userId: string) {
    const user = await this.usersQueryService.editUser(userId, {
      deleted: true,
      deletedAt: new Date(Date.now()),
    });

    if (!user) throw new UnprocessableEntityException('Error deleting  user');

    return this.responseService.response(true, 'User deleted successfully', {
      user,
    });
  }

  async allUsers(paginationDto: PaginationDto) {
    if (paginationDto.limit) {
      let checkNum = Number(paginationDto.limit);

      if (!checkNum)
        throw new UnprocessableEntityException('Limit must be a number');
    }
    if (paginationDto.page) {
      let checkPage = Number(paginationDto.page);

      if (!checkPage)
        throw new UnprocessableEntityException('Page must be a number');
    }

    const data = await this.usersQueryService.findAllUsers(paginationDto);

    return this.responseService.response(
      true,
      'All users retrieved successfully',
      { ...data },
    );
  }
}
