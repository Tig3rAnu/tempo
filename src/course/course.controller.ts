import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post()
  async createCourse(@Body() createCourses: CreateCourseDto) {
    return this.courseService.createCourse(createCourses);
  }
  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }
  @Get('/:id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }
  @Patch('/:id')
  updateCourse(
    @Param('id') courseId: string,
    @Body() updateCourse: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(courseId, updateCourse);
  }
  @Delete('/:id')
  deleteCourse(@Param('id') courseId: string) {
    return this.courseService.deleteCourse(courseId);
  }
}
