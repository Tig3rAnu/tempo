import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
