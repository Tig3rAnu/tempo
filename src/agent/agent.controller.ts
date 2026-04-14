import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto, UpdateAgentDto } from './dto/agent.dto';
import { Agent } from '@prisma/client';

@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}
  @Post()
  async createAgent(@Body() createAgent: CreateAgentDto): Promise<Agent> {
    return this.agentService.createAgent(createAgent);
  }
  @Get()
  async getAllAgents() {
    return await this.agentService.getAllAgents();
  }
  @Get('/:id')
  async getAgentDetails(@Param('id') agentId: string) {
    return await this.agentService.getAgentDetail(agentId);
  }
  @Patch('/:id')
  async updateAgentDetails(
    @Param('id') agentId: string,
    @Body() updateAgentDto: UpdateAgentDto,
  ) {
    return this.agentService.updateAgentDetails(agentId, updateAgentDto);
  }
  @Delete('/:id')
  async deleteAgentDetails(@Param('id') agentId: string) {
    return await this.agentService.deleteAgentDetails(agentId);
  }
}
