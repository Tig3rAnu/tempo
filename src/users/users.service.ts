import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { prismaExclude } from 'src/utility';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    try {
      const userList = await this.prisma.user.findMany({
        select: prismaExclude('User', ['password']),
      });
      return userList;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2002') {
          throw new ConflictException('A unique constraint would be violated');
        } else {
          // Handle other known Prisma errors
          throw new InternalServerErrorException(
            'An error occurred while Getting the user',
          );
        }
      } else {
        // Handle all other errors
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
  async getUserDetails(userId: string) {
    const userById = await this.prisma.user.findUnique({
      where: { id: userId },
      select: prismaExclude('User', ['password']),
    });
    return userById;
  }
}
