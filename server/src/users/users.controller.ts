import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FailResponseDto } from 'src/auth/dto/fail-response.dto';
import { IResponse } from 'src/utils/response/response.type';
import { EditUserDto } from './dto/edit-user.dto';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { PaginationDto } from './dto/pagination.dto';
import { RolesGuard } from 'src/utils/guards/role-guard';
import { Roles } from 'src/utils/custom-decorators/role.decorator';
import { Role } from 'src/utils/enums';

@ApiTags('users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.admin)
  @Post('')
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({
    status: 201,
    description: 'User created successfully',
    // type: CreateEmployeesResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to create user',
    type: FailResponseDto,
  })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    return this.usersService.createUser(createUserDto);
  }

  @Roles(Role.admin)
  @Patch(':userId')
  @ApiOperation({ summary: 'Edit user' })
  @ApiOkResponse({
    status: 200,
    description: 'User edited successfully',
    // type: CreateEmployeesResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to edit user',
    type: FailResponseDto,
  })
  @ApiBody({ type: EditUserDto })
  @HttpCode(HttpStatus.OK)
  async editEmployee(
    @Body() editUserDto: EditUserDto,
    @Param('userId')
    userId: string,
  ): Promise<IResponse> {
    return this.usersService.editUser(userId, editUserDto);
  }

  @Roles(Role.admin)
  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({
    status: 200,
    description: 'User deleted successfully',
    type: SuccessResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error deleting user',
    type: FailResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async deleteRole(
    @Param('userId')
    userId: string,
  ): Promise<IResponse> {
    return await this.usersService.deleteUser(userId);
  }

  @Roles(Role.admin, Role.user)
  @Get('')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    status: 200,
    description: 'All users retrieved successfully',
    type: SuccessResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to retrieve all users',
    type: FailResponseDto,
  })
  @ApiQuery({ name: 'limit', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @HttpCode(HttpStatus.OK)
  async allUsers(@Query() paginationDto: PaginationDto): Promise<IResponse> {
    return this.usersService.allUsers(paginationDto);
  }
}
