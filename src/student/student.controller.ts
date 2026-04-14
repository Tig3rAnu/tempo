import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from '@prisma/client';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Post()
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }
  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }
  @Get('/:id')
  async getStudentDetails(@Param('id') studentId: string) {
    return this.studentService.getStudentDetails(studentId);
  }
  @Patch('/:id')
  async updateStudentDetails(
    @Param('id') studentId,
    @Body() updateStudent: UpdateStudentDto,
  ) {
    return this.studentService.updateStudentDetails(studentId, updateStudent);
  }
  @Delete('/:id')
  async deleteStudent(@Param('id') studentId: string) {
    return this.studentService.deleteStudent(studentId);
  }
}
