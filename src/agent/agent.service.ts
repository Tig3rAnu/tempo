import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAgentDto, UpdateAgentDto } from './dto/agent.dto';
import { Agent, Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prismaExclude } from '../utility';

@Injectable()
export class AgentService {
  constructor(private readonly prismaService: PrismaService) {}
  async createAgent(createAgent: CreateAgentDto): Promise<Agent> {
    try {
      const { role, password, ...data } = createAgent;
      const hashedPassword = await bcrypt.hash(password, 12);
      return await this.prismaService.agent.create({
        data: {
          ...data,
          password: hashedPassword,
          role: UserRole.AGENT,
        },
      });
    } catch (error) {}
  }
  async getAllAgents() {
    try {
      return await this.prismaService.agent.findMany({
        select: prismaExclude('Agent', ['password']),
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(
          'An error occurred while creating the agent',
        );
      } else if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
  async getAgentDetail(agentId: string) {
    try {
      const agentById = await this.prismaService.agent.findUnique({
        where: { id: agentId },
        select: prismaExclude('Agent', ['password']),
      });
      if (!agentById) {
        throw new NotFoundException(`Agent with ID ${agentId} not found`);
      }
      return agentById;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2025') {
          throw new NotFoundException(`Agent with ID ${agentId} not found`);
        } else {
          // Handle other known Prisma errors
          throw new InternalServerErrorException(
            'An error occurred while getting the agents',
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

  async updateAgentDetails(agentId: string, updateAgent: UpdateAgentDto) {
    try {
      const { role, ...data } = updateAgent;
      return await this.prismaService.agent.update({
        where: { id: agentId },
        data: {
          ...data,
          role: role,
        },
        select: prismaExclude('Agent', ['password']),
      });
    } catch (error) {}
  }
  async deleteAgentDetails(agentId: string) {
    try {
      const agentById = await this.prismaService.agent.findUnique({
        where: { id: agentId },
        select: prismaExclude('Agent', ['password']),
      });
      if (!agentById) {
        throw new NotFoundException(`Agent with ID ${agentId} not found`);
      }

      await this.prismaService.agent.deleteMany({
        where: { id: agentId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2025') {
          throw new NotFoundException(`Agent with ID ${agentId} not found`);
        } else {
          // Handle other known Prisma errors
          throw new InternalServerErrorException(
            'An error occurred while deleting the agent',
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
