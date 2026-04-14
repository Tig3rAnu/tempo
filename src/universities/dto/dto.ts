import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Course name should not be empty' })
  name: string;
  @IsString()
  accountKey: string;
  @IsString()
  @IsNotEmpty()
  duration: string;
  @IsString()
  @IsNotEmpty()
  fee: string;
  @IsString()
  @IsNotEmpty()
  medium: string;
  @IsString()
  @IsNotEmpty()
  level: string;
}

class CreateBankDetailsDto {
  @IsString()
  @IsNotEmpty()
  readonly bankName: string;
  @IsString()
  @IsNotEmpty()
  readonly accountNumber: string;
  @IsString()
  @IsNotEmpty()
  readonly tinNumber: string;
  @IsString()
  @IsNotEmpty()
  readonly bikNumber: string;
  @IsString()
  @IsNotEmpty()
  readonly corrospondant: string;
  @IsString()
  @IsNotEmpty()
  readonly trrcNumber: string;
}

export class CreateUniversityDTO {
  @IsString()
  @Length(3, 50, {
    message: 'University name should not be grater then 35 char',
  })
  @IsNotEmpty({ message: 'University name should not be empty' })
  name: string;
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'Country should not be empty' })
  country: string;
  @IsString()
  city: string;
  @IsString()
  total_course: string;
  @IsString()
  hostel_fee: string;
  @IsString()
  medical_insurance: string;
  @IsString()
  foreign_students: string;
  @IsBoolean()
  notary: boolean;
  @IsArray()
  documents_required: string[];
  @IsString()
  universityHistory: string;
  @IsString()
  aboutCountry: string;
  @IsString()
  cityWeather: string;
  @IsString()
  aboutHostels: string;
  @IsArray()
  @IsOptional()
  readonly courses: CreateCourseDto[];
  @IsObject()
  @IsOptional()
  readonly bankDetails?: CreateBankDetailsDto;
}

class UpdateCourseDto extends CreateCourseDto {
  @IsString()
  id: string;
}

class UpdateBankDetailsDto extends CreateBankDetailsDto {
  @IsString()
  id: string;
}

export class UpdateUniversityDto extends CreateUniversityDTO {
  @ValidateNested({ each: true })
  @Type(() => UpdateCourseDto)
  courses: UpdateCourseDto[];
  @ValidateNested({ each: true })
  @Type(() => UpdateBankDetailsDto)
  bankDetails: UpdateBankDetailsDto;
}
