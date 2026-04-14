import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
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
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  mobileNumber: string;
  @IsEnum(UserRole)
  role: UserRole;
}

export class StudentDto extends UserDto {
  @IsString()
  fatherName: string;
  @IsString()
  passportNumber: string;
  @IsString()
  dob: Date;
}

export class AgentDto extends UserDto {
  @IsString()
  companyName: string;
  @IsString()
  gstNumber: string;
  @IsString()
  companyRegistration: string;
  @IsString()
  agentIdProof: string;
}

export class UpdateAgentDto extends AgentDto {
  @IsString()
  id: string;
}

export class UpdateStudentDto extends StudentDto {
  @IsString()
  id: string;
}
export class UpdateUserDto extends UserDto {
  @IsString()
  id: string;
}
