import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateNotaryDto,
  CreateNotaryProvidersDto,
  UpdateNotaryProviderDto,
} from './dto/notary.dto';
import { EmailService } from 'src/email/email.service';
import { NotarizedDocuments, NotaryProviders } from '@prisma/client';

@Injectable()
export class NotaryService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}
  async createNotary(
    createNotary: CreateNotaryDto,
  ): Promise<NotarizedDocuments> {
    try {
      const { fullName, email } = createNotary;
      const text = `name: ${fullName}, email: ${email}`;
      const notary = await this.prisma.notarizedDocuments.create({
        data: { ...createNotary },
      });
      const attachments = [
        {
          fileName: 'documents',
          path: 'https://res.cloudinary.com/djjg29rfa/image/upload/v1710893235/keqio2tf2ubigr1osxwf.png',
        },
      ];
      await this.emailService.sendEmail(
        'piyushkuntal94@gmail.com',
        `Documents For Notary`,
        text,
        attachments,
      );
      return notary;
    } catch (error) {}
  }
  async createNotaryProviders(
    createProviders: CreateNotaryProvidersDto,
  ): Promise<NotaryProviders> {
    try {
      return await this.prisma.notaryProviders.create({
        data: { ...createProviders },
      });
    } catch (error) {}
  }
  async getAllNotaryProviders(): Promise<NotaryProviders[]> {
    try {
      return await this.prisma.notaryProviders.findMany();
    } catch (error) {}
  }
  async getNotaryProvidersDetails(
    providerId: string,
  ): Promise<NotaryProviders> {
    try {
      const findById = this.prisma.notaryProviders.findUnique({
        where: { id: providerId },
      });
      return findById;
    } catch (error) {}
  }

  async updateNotaryProviderDetails(
    providerId: string,
    updateProvider: UpdateNotaryProviderDto,
  ): Promise<NotaryProviders> {
    try {
      return await this.prisma.notaryProviders.update({
        where: { id: providerId },
        data: { ...updateProvider },
      });
    } catch (error) {}
  }
  async deleteNotaryProvider(providerId: string) {
    await this.prisma.notaryProviders.delete({ where: { id: providerId } });
  }
}
