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
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FailResponseDto } from 'src/auth/dto/fail-response.dto';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { IResponse } from 'src/utils/response/response.type';
import { RolesGuard } from 'src/utils/guards/role-guard';
import { Roles } from 'src/utils/custom-decorators/role.decorator';
import { Role } from 'src/utils/enums';

@ApiTags('roles')
@Controller('roles')
@UseGuards(RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(Role.admin, Role.user)
  @Get('')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({
    status: 200,
    description: 'All roles retrieved successfully',
    type: SuccessResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to retrieve all roles',
    type: FailResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async allUsers(): Promise<IResponse> {
    return this.rolesService.allRoles();
  }
}
