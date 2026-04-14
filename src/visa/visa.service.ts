import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVisaDetailsDto, UpdateVisaDetailsDto } from './dto/visa.dto';
import { VisaDetails } from '@prisma/client';

@Injectable()
export class VisaService {
  constructor(private prismaService: PrismaService) {}
  async createVisaDetails(
    createVisa: CreateVisaDetailsDto,
  ): Promise<VisaDetails> {
    try {
      return await this.prismaService.visaDetails.create({
        data: createVisa,
      });
    } catch (error) {}
  }
  async getAllVisaDetails(): Promise<VisaDetails[]> {
    try {
      return await this.prismaService.visaDetails.findMany();
    } catch (error) {}
  }
  async getVisaDetailsById(visaId: string): Promise<VisaDetails> {
    try {
      const findUnique = await this.prismaService.visaDetails.findUnique({
        where: { id: visaId },
      });
      return findUnique;
    } catch (error) {}
  }
  async updateVisaDetails(
    visaId: string,
    updateVisaDetails: UpdateVisaDetailsDto,
  ): Promise<VisaDetails> {
    try {
      const findVisaDetails = this.getVisaDetailsById(visaId);
      if (!findVisaDetails) {
        throw new NotFoundException('not found');
      }
      return await this.prismaService.visaDetails.update({
        where: { id: visaId },
        data: updateVisaDetails,
      });
    } catch (error) {}
  }
  async deleteVisaDetails(visaId: string) {
    try {
      await this.prismaService.visaDetails.delete({ where: { id: visaId } });
    } catch (error) {}
  }
}
