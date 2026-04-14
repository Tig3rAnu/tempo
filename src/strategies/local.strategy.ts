import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    username: string,
    password: string,
  ): Promise<User> {
    const { userType } = request.body;
    if (!username && !password) {
      throw new UnauthorizedException('Invalid userName and password');
    }
    const user = await this.authService.validateUser(
      username,
      password,
      userType,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username and password.');
    }
    const compairPassword = await bcrypt.compare(password, user?.password);
    if (!compairPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
