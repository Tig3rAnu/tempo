import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import {
  CreateAdmissionDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { Application } from '@prisma/client';

@Controller('application')
export class ApplicationController {
  constructor(private admissionService: ApplicationService) {}
  @Post()
  async createAdmission(
    @Body() createAdmissionDto: CreateAdmissionDto,
  ): Promise<Application> {
    return await this.admissionService.createAdmission(createAdmissionDto);
  }
  @Get()
  async getAllApplications(): Promise<Application[]> {
    return await this.admissionService.getAllApplications();
  }
  @Get('/:id')
  async getApplicationDetails(@Param('id') applicationId: string) {
    return await this.admissionService.getApplicationDetails(applicationId);
  }
  @Patch('/:id')
  async updateApplicationDetails(
    @Param('id') applicationId: string,
    @Body() updateApplication: UpdateApplicationDto,
  ) {
    return await this.admissionService.updateApplicationDetails(
      applicationId,
      updateApplication,
    );
  }
  @Delete('/:id')
  async deleteApplicationDetails(@Param('id') applicationId: string) {
    return await this.admissionService.deleteApplicationDetails(applicationId);
  }
}
