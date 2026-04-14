import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VisaService } from './visa.service';
import { VisaDetails } from '@prisma/client';
import { CreateVisaDetailsDto, UpdateVisaDetailsDto } from './dto/visa.dto';

@Controller('visa')
export class VisaController {
  constructor(private visaDetailsService: VisaService) {}
  @Post()
  async createVisaDetails(
    @Body() createVisaDetails: CreateVisaDetailsDto,
  ): Promise<VisaDetails> {
    return this.visaDetailsService.createVisaDetails(createVisaDetails);
  }
  @Get()
  async getAllVisaDetails(): Promise<VisaDetails[]> {
    return this.visaDetailsService.getAllVisaDetails();
  }
  @Get('/:id')
  async getVisaDetailsById(@Param('id') visaId: string): Promise<VisaDetails> {
    return this.visaDetailsService.getVisaDetailsById(visaId);
  }
  @Patch('/:id')
  async updateVisaDetails(
    @Param('id') visaId: string,
    @Body() updateVisa: UpdateVisaDetailsDto,
  ): Promise<VisaDetails> {
    return this.visaDetailsService.updateVisaDetails(visaId, updateVisa);
  }
  @Delete('/:id')
  async deleteVisaDetails(@Param('id') visaId: string) {
    return this.visaDetailsService.deleteVisaDetails(visaId);
  }
}
