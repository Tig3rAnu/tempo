import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAgentDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsOptional()
  password: string;
  @IsString()
  @IsNotEmpty()
  mobileNumber: string;
  @IsString()
  companyName: string;
  @IsString()
  gstNumber: string;
  @IsString()
  companyRegistration: string;
  @IsString()
  agentIdProof: string;
  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateAgentDto extends CreateAgentDto {
  @IsString()
  id: string;
}
