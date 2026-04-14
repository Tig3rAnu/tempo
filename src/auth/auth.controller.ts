import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGaurd } from './auth.local.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { AgentDto, StudentDto, UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUserDto: UserDto | StudentDto | AgentDto) {
    return this.authService.signup(createUserDto);
  }
  @UseGuards(LocalAuthGaurd)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }
  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  profile(@Request() req) {
    return {
      message: 'you are autherized',
      user: req.user,
    };
  }
  @Post('logout')
  logout(@Request() req) {
    req.session.destroy();
    return {
      message: 'you are logged out',
    };
  }
}
