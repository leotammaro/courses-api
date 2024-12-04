import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './application/dto/auth.dto';
import { AuthService } from './application/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }
}
