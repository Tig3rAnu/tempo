import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Student } from '@prisma/client';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import * as bycrypt from 'bcrypt';
import { prismaExclude } from 'src/utility';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}
  async createStudent(createStudent: CreateStudentDto): Promise<Student> {
    try {
      const { role, password, ...data } = createStudent;
      const hashedPassword = await bycrypt.hash(password, 12);
      const student = await this.prismaService.student.create({
        data: {
          ...data,
          role: role,
          password: hashedPassword,
        },
      });
      return student;
    } catch (error) {}
  }
  async getAllStudents() {
    try {
      const excludePassword = prismaExclude('Student', ['password']);
      const allStudents = await this.prismaService.student.findMany({
        select: { applications: true, ...excludePassword },
      });
      return allStudents;
    } catch (error) {}
  }
  async getStudentDetails(studentId: string) {
    try {
      const excludePassword = prismaExclude('Student', ['password']);
      const studentById = await this.prismaService.student.findUnique({
        where: { id: studentId },
        select: { applications: true, ...excludePassword },
      });
      return studentById;
    } catch (error) {}
  }
  async updateStudentDetails(
    studentId: string,
    updateStudent: UpdateStudentDto,
  ) {
    try {
      const studentById = await this.prismaService.student.findUnique({
        where: { id: studentId },
      });
      if (!studentById) {
        throw new NotFoundException(
          `Student not fond with this id: ${studentId}`,
        );
      }
      return await this.prismaService.student.update({
        where: { id: studentId },
        select: prismaExclude('Student', ['password']),
        data: updateStudent,
      });
    } catch (error) {}
  }

  async deleteStudent(studentId: string) {
    await this.prismaService.student.delete({
      where: { id: studentId },
    });
  }
}
