import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDTO, UpdateUniversityDto } from './dto/dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universityService: UniversitiesService) {}
  @Post()
  createUniversity(@Body() createUniversityDto: CreateUniversityDTO) {
    return this.universityService.createUniversity(createUniversityDto);
  }
  @UseGuards(AuthenticatedGuard)
  @Get()
  getAllUniversities() {
    return this.universityService.getAllUniversities();
  }
  @Get('/:id')
  getUniversityById(@Param('id') id: string) {
    return this.universityService.getUniversityById(id);
  }
  @Patch('/:id')
  updateUniversity(
    @Body() updateUniversity: UpdateUniversityDto,
    @Param('id') id: string,
  ) {
    return this.universityService.updateUniversity(id, updateUniversity);
  }
  @Delete('/:id')
  deleteUniversity(@Param('id') id: string) {
    return this.universityService.deleteUniversity(id);
  }
}
