import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Application, Prisma } from '@prisma/client';
import {
  CreateAdmissionDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ApplicationService {
  constructor(
    private prismaService: PrismaService,
    private readonly emailService: EmailService,
  ) {}
  async createAdmission(
    createAdmission: CreateAdmissionDto,
  ): Promise<Application> {
    try {
      const { studentId, ...applicationData } = createAdmission;
      const text = `university: ${applicationData.university}, course: ${applicationData.course}, country: ${applicationData.country}`;
      const admissionDetails = await this.prismaService.application.create({
        data: createAdmission,
      });
      const attachments = [
        {
          fileName: 'documents',
          path: 'https://res.cloudinary.com/djjg29rfa/image/upload/v1710893235/keqio2tf2ubigr1osxwf.png',
        },
      ];
      await this.emailService.sendEmail(
        'piyushkuntal94@gmail.com',
        `New Application for - ${applicationData.course}`,
        text,
        attachments,
      );
      return admissionDetails;
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
  async getAllApplications(): Promise<Application[]> {
    try {
      return await this.prismaService.application.findMany();
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
  async getApplicationDetails(applicationId: string): Promise<Application> {
    try {
      const application = await this.prismaService.application.findUnique({
        where: { id: applicationId },
      });
      if (!application) {
        throw new NotFoundException(
          `Application with ID: ${applicationId} does not exit.`,
        );
      }
      return application;
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
  async updateApplicationDetails(
    applicationId: string,
    updateApplication: UpdateApplicationDto,
  ): Promise<Application> {
    try {
      return await this.prismaService.application.update({
        where: { id: applicationId },
        data: { ...updateApplication },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Application with ID ${applicationId} not found`,
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
  async deleteApplicationDetails(applicationId: string) {
    try {
      await this.prismaService.application.delete({
        where: { id: applicationId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Application with ID ${applicationId} not found`,
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
}
