import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersQueryService } from 'src/users/users-query/users-query.service';
import { Role } from '../enums';
import { ROLES_KEY } from '../custom-decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersQueryService: UsersQueryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const theUser = await this.usersQueryService.findUserById(user);

    if (!theUser) throw new NotFoundException('User does not exist');

    return requiredRoles.some((role) => theUser.role.name.includes(role));
  }
}
