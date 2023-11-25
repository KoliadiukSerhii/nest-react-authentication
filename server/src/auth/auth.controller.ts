import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../user/dto/auth.dto';
import { LoginDto } from '../user/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: AuthDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @Get('logout')
  async logout(@Request() req, @Response({ passthrough: true }) res) {
    return this.authService.logout(req, res);
  }
}
