import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { AgentDto, StudentDto, UserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(createUserDto: UserDto | StudentDto | AgentDto): Promise<User> {
    const { role, password, ...data } = createUserDto;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const existingUser = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new ConflictException('username already exists');
    }
    if (role === UserRole.SUPERADMIN) {
      return this.prisma.user.create({
        data: {
          ...data,
          role: UserRole.SUPERADMIN,
          password: hashedPassword,
        } as UserDto,
      });
    } else if (role === UserRole.ADMIN) {
      return this.prisma.user.create({
        data: {
          ...data,
          role: UserRole.ADMIN,
          password: hashedPassword,
        } as UserDto,
      });
    } else if (role === UserRole.AGENT) {
      return this.prisma.agent.create({
        data: {
          ...data,
          role: UserRole.AGENT,
          password: hashedPassword,
        } as AgentDto,
      });
    } else if (role === UserRole.STUDENT) {
      return this.prisma.student.create({
        data: {
          ...data,
          role: UserRole.STUDENT,
          password: hashedPassword,
        } as StudentDto,
      });
    } else {
      throw new UnauthorizedException('Invalid user type');
    }
  }

  async validateUser(
    username: string,
    password: string,
    userType: string,
  ): Promise<User | null> {
    let user;
    if (userType === 'SUPERADMIN') {
      user = await this.prisma.user.findUnique({
        where: { username: username },
      });
    } else if (userType === 'ADMIN') {
      user = await this.prisma.user.findUnique({
        where: { username: username },
      });
    } else if (userType === 'AGENT') {
      user = await this.prisma.agent.findUnique({
        where: { username: username },
      });
    } else if (userType === 'STUDENT') {
      user = await this.prisma.student.findUnique({
        where: { username: username },
      });
    }
    if (!user) {
      return null;
    }
    return user;
  }
}
