import { Module } from '@nestjs/common';
import { NotaryService } from './notary.service';
import { NotaryController } from './notary.controller';
import { PrismaService } from '../prisma.service';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, PrismaService, NotaryService, EmailService],
  controllers: [NotaryController],
})
export class NotaryModule {}
