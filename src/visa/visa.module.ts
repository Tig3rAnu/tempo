import { Module } from '@nestjs/common';
import { VisaController } from './visa.controller';
import { VisaService } from './visa.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [VisaController],
  providers: [PrismaService, VisaService],
})
export class VisaModule {}
