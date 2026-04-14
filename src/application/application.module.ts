import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaService } from '../prisma.service';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ApplicationController],
  providers: [ConfigService, EmailService, PrismaService, ApplicationService],
})
export class ApplicationModule {}
