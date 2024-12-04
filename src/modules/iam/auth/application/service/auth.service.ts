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

@Injectable()
export class AuthService {
  constructor(
    @Inject(EXTERNAL_AUTH_SERVICE)
    private readonly authService: IAuthExternalProvider,
  ) {}

  async signUp(authDto: AuthDto) {
    try {
      const signUpResult = await this.authService.signUp(authDto);
      return signUpResult;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
