import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from '../application/dto/auth.dto';
import { AuthService } from '../application/service/auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up user' })
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in user' })
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
