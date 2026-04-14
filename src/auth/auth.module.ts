import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { PrismaService } from 'src/prisma.service';
import { SessionSerializer } from './session.serializer';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, PrismaService, SessionSerializer],
})
export class AuthModule {}
