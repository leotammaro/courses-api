import { Module, Provider } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/application/service/auth.service';
import {
  EXTERNAL_AUTH_SERVICE,
  FireBaseAuthService,
} from './auth/application/service/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from './user/infrastructure/database/user.repository';
import { UserService } from './user/application/service/user.service';
import { AuthGuard } from './auth/application/guard/auth.guard';

const authServiceProvider: Provider = {
  provide: EXTERNAL_AUTH_SERVICE,
  useClass: FireBaseAuthService,
};

const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    authServiceProvider,
    userRepositoryProvider,
    AuthService,
    UserService,
    AuthGuard,
  ],
  exports: [AuthService, AuthGuard, UserService],
})
export class IamModule {}
