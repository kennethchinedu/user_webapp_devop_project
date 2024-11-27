import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesQueryService } from './roles-query/roles-query.service';
import { ResponseService } from 'src/utils/response/response.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesQueryService: RolesQueryService,
    private readonly responseService: ResponseService,
  ) {}

  async allRoles() {
    const roles = await this.rolesQueryService.findAllRoles();
    return this.responseService.response(
      true,
      'All roles retrieved successfully',
      { roles },
    );
  }
}
