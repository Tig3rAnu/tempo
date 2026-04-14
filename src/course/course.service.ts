import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Course, Prisma } from '@prisma/client';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async createCourse(createCourses: CreateCourseDto): Promise<Course> {
    try {
      const { universities, level, ...data } = createCourses;
      const createCourse = await this.prisma.course.create({
        data: {
          ...data,
          level: level as 'UG' | 'PG' | 'Language',
          universities: {
            connect: universities
              ? universities.map((id) => ({
                  id: id,
                }))
              : [],
          },
        },
      });

      return createCourse;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2002') {
          throw new ConflictException('A unique constraint would be violated');
        } else {
          // Handle other known Prisma errors
          throw new InternalServerErrorException(
            'An error occurred while creating the Course',
          );
        }
      } else {
        // Handle all other errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async getAllCourses(): Promise<Course[]> {
    try {
      const courses = await this.prisma.course.findMany({
        include: {
          universities: true,
        },
      });
      return courses;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        throw new InternalServerErrorException('A database error occurred');
      } else {
        // Handle all other errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async getCourseById(courseId: string): Promise<Course> {
    try {
      const courseDetails = await this.prisma.course.findUnique({
        where: { id: courseId },
        include: {
          universities: true,
        },
      });
      if (!courseDetails) {
        throw new NotFoundException(
          `University with ID: ${courseId} does not exit.`,
        );
      }
      return courseDetails;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        throw new InternalServerErrorException('A database error occurred');
      } else if (error instanceof NotFoundException) {
        // Handle NotFoundException
        throw error;
      } else {
        // Handle all other errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const { level, universities, ...courseData } = updateCourseDto;
    const course = this.prisma.course.update({
      where: { id: courseId },
      data: {
        ...courseData,
        level: level as 'UG' | 'PG' | 'Language',
      },
    });
    if (!course) {
      throw new NotFoundException(`Course with ID: ${courseId} does not exit.`);
    }
    return course;
  }

  async deleteCourse(courseId: string) {
    await this.prisma.course.deleteMany({
      where: { id: courseId },
    });
  }
}
