import { Module, Provider } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/application/service/auth.service';
import {
  EXTERNAL_AUTH_SERVICE,
  FireBaseAuthService,
} from './auth/application/service/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';

const authServiceProvider: Provider = {
  provide: EXTERNAL_AUTH_SERVICE,
  useClass: FireBaseAuthService,
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [authServiceProvider, AuthService],
  exports: [AuthService],
})
export class IamModule {}
