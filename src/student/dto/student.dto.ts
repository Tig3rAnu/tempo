import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
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
  passportNumber: string;
  @IsString()
  @IsOptional()
  dob: string;
  @IsString()
  fatherName: string;
  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateStudentDto extends CreateStudentDto {
  @IsString()
  id: string;
}
