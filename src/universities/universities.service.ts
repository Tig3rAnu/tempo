import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUniversityDTO, UpdateUniversityDto } from './dto/dto';
import { PrismaService } from '../prisma.service';
import { Prisma, University } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UniversitiesService {
  constructor(private prisma: PrismaService) {}
  async createUniversity(
    createUniversityDto: CreateUniversityDTO,
  ): Promise<University> {
    try {
      const { courses, bankDetails, ...universityData } = createUniversityDto;
      const accountNumber = await bcrypt.hash(bankDetails.accountNumber, 12);
      const tinNumber = await bcrypt.hash(bankDetails.tinNumber, 12);
      const bikNumber = await bcrypt.hash(bankDetails.bikNumber, 12);
      const trrcNumber = await bcrypt.hash(bankDetails.trrcNumber, 12);
      const createUniversity = await this.prisma.university.create({
        data: {
          ...universityData,
          courses: {
            create: courses.map((course) => ({
              name: course.name,
              level: course.level as 'UG' | 'PG' | 'Language',
              accountKey: course.accountKey,
              fee: course.fee,
              duration: course.duration,
              medium: course.medium,
            })),
          },
          bankDetails: {
            create: {
              ...bankDetails,
              accountNumber,
              tinNumber,
              bikNumber,
              trrcNumber,
            },
          },
        },
        include: {
          courses: true,
          bankDetails: true,
        },
      });

      return createUniversity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2002') {
          throw new ConflictException('A unique constraint would be violated');
        } else {
          // Handle other known Prisma errors
          throw new InternalServerErrorException(
            'An error occurred while creating the university',
          );
        }
      } else {
        // Handle all other errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
  async getUniversityById(universityId: string): Promise<University> {
    try {
      const universityDetails = await this.prisma.university.findUnique({
        where: { id: universityId },
        include: {
          courses: true,
          bankDetails: true,
        },
      });
      if (!universityDetails) {
        throw new NotFoundException(
          `University with ID: ${universityId} does not exit.`,
        );
      }
      return universityDetails;
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
  async getAllUniversities(): Promise<University[]> {
    try {
      const universities = await this.prisma.university.findMany({
        include: {
          courses: true,
          bankDetails: true,
        },
      });
      return universities;
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
  async updateUniversity(
    universityId: string,
    updateUniversityDto: UpdateUniversityDto,
  ): Promise<University> {
    try {
      const { courses, bankDetails, ...universityData } = updateUniversityDto;
      const accountNumber = await bcrypt.hash(bankDetails.accountNumber, 12);
      const tinNumber = await bcrypt.hash(bankDetails.tinNumber, 12);
      const bikNumber = await bcrypt.hash(bankDetails.bikNumber, 12);
      const trrcNumber = await bcrypt.hash(bankDetails.trrcNumber, 12);
      await this.getUniversityById(universityId);
      const updatedUniversity = await this.prisma.university.update({
        where: { id: universityId },
        data: {
          ...universityData,
          ...(courses && {
            courses: {
              update: courses.map((course) => ({
                where: { id: course.id },
                data: {
                  name: course.name,
                  accountKey: course.accountKey,
                  fee: course.fee,
                  duration: course.duration,
                  level: course.level as 'UG' | 'PG' | 'Language',
                  medium: course.medium,
                },
              })),
            },
          }),
          ...(bankDetails && {
            bankDetails: {
              update: {
                id: bankDetails.id,
                ...bankDetails,
                accountNumber,
                tinNumber,
                bikNumber,
                trrcNumber,
              },
            },
          }),
        },
        include: { courses: true, bankDetails: true },
      });
      return updatedUniversity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `University with ID ${universityId} not found`,
          );
        } else if (error.code === 'P2002') {
          throw new ConflictException('A unique constraint would be violated');
        } else {
          // Handle other known Prisma errors
          throw new InternalServerErrorException('A database error occurred');
        }
      } else if (error instanceof NotFoundException) {
        // Handle NotFoundException
        throw error;
      } else {
        // Handle all other errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
  async deleteUniversity(universityId: string): Promise<void> {
    try {
      const university = await this.prisma.university.findUnique({
        where: { id: universityId },
        include: { bankDetails: true, courses: true },
      });

      if (!university) {
        throw new NotFoundException(
          `University with ID ${universityId} not found`,
        );
      }
      await this.prisma.bankDetails.deleteMany({
        where: { id: university.bankDetails.id },
      });

      university.courses.map(async (course) => {
        await this.prisma.course.delete({
          where: { id: course.id },
        });
      }),
        await this.prisma.university.delete({
          where: { id: universityId },
        });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `University with ID ${universityId} not found`,
          );
        } else {
          // Handle other known Prisma errors
          throw new InternalServerErrorException(
            'An error occurred while deleting the university',
          );
        }
      } else if (error instanceof NotFoundException) {
        // Handle NotFoundException
        throw error;
      } else {
        // Handle all other errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
