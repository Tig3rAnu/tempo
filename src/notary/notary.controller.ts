import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotaryService } from './notary.service';
import {
  CreateNotaryDto,
  CreateNotaryProvidersDto,
  UpdateNotaryProviderDto,
} from './dto/notary.dto';
import { NotarizedDocuments, NotaryProviders } from '@prisma/client';

@Controller('notary')
export class NotaryController {
  constructor(private notaryService: NotaryService) {}
  @Post()
  async createNotary(
    @Body() createDocuments: CreateNotaryDto,
  ): Promise<NotarizedDocuments> {
    return await this.notaryService.createNotary(createDocuments);
  }
  @Post('/provider')
  async createNotaryProviders(
    @Body() createProviders: CreateNotaryProvidersDto,
  ): Promise<NotaryProviders> {
    return await this.notaryService.createNotaryProviders(createProviders);
  }
  @Get('/provider')
  async getAllNotaryProviders(): Promise<NotaryProviders[]> {
    return await this.notaryService.getAllNotaryProviders();
  }
  @Get('/provider/:id')
  async getNotaryProvidersDetails(
    @Param('id') providerId: string,
  ): Promise<NotaryProviders> {
    return await this.notaryService.getNotaryProvidersDetails(providerId);
  }
  @Put('/provider/:id')
  async updateNotaryProviderDetails(
    @Param('id') providerId: string,
    @Body() updateProvider: UpdateNotaryProviderDto,
  ): Promise<NotaryProviders> {
    return await this.notaryService.updateNotaryProviderDetails(
      providerId,
      updateProvider,
    );
  }
  @Delete('/provider/:id')
  async deleteNotaryProvider(@Param('id') providerId: string) {
    return await this.notaryService.deleteNotaryProvider(providerId);
  }
}
