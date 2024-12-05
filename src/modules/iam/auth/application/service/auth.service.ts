import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import {
  EXTERNAL_AUTH_SERVICE,
  IAuthExternalProvider,
} from './firebase.service';
import { UserService } from 'src/modules/iam/user/application/service/user.service';
import { UserDto } from 'src/modules/iam/user/application/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(EXTERNAL_AUTH_SERVICE)
    private readonly authService: IAuthExternalProvider,
    private readonly userService: UserService,
  ) {}

  async signUp(authDto: AuthDto) {
    try {
      const signUpResult = await this.authService.signUp(authDto);
      const userData: UserDto = {
        username: authDto.email,
        externalId: signUpResult.externalId,
        isVerified: false,
      };
      await this.userService.create(userData);

      return signUpResult;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
