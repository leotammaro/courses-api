import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../../user/application/service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const user = await this.userService.getOneByExternalIdOrFail(
      request.body.userId,
    );
    return !!user;
  }
}
