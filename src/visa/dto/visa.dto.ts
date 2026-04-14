import { IsEmail, IsOptional, IsString, Max } from 'class-validator';

export class CreateVisaDetailsDto {
  @IsString()
  country: string;
  @IsString()
  helplineNumber: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  universityName: string;
  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateVisaDetailsDto extends CreateVisaDetailsDto {
  @IsString()
  id: string;
}
