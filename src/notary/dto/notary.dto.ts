import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateNotaryDto {
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  mobileNumber: string;
  @IsArray()
  documents: [];
  @IsString()
  @IsOptional()
  studentId: string;
}

export class CreateNotaryProvidersDto {
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  mobileNumber: string;
  @IsString()
  firmName: string;
  @IsString()
  @IsOptional()
  address: string;
}
export class UpdateNotaryProviderDto extends CreateNotaryProvidersDto {
  @IsString()
  id: string;
}
