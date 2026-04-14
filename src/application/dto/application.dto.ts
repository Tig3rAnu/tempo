import { ApplicationStatus } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdmissionDto {
  @IsString()
  country: string;
  @IsString()
  city: string;
  @IsString()
  course: string;
  @IsString()
  university: string;
  @IsString()
  medium: string;
  @IsString()
  fullName: string;
  @IsString()
  fatherName: string;
  @IsString()
  motherName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  mobileNumber: string;
  @IsString()
  citizen: string;
  @IsString()
  zipCode: string;
  @IsString()
  state: string;
  @IsString()
  passportNumber: string;
  @IsString()
  secoundaryBoard: string;
  @IsString()
  secoundaryGrades: string;
  @IsString()
  higherSecondaryBoard: string;
  @IsString()
  stream: string;
  @IsString()
  higherSecondaryGrades: string;
  @IsString()
  universityName: string;
  @IsString()
  grades: string;
  @IsString()
  degree: string;
  @IsArray()
  documents: string[];
  @IsString()
  studentId: string;
  @IsString()
  @IsOptional()
  agentId: string;
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}

export class UpdateApplicationDto extends CreateAdmissionDto {
  @IsString()
  id: string;
}
