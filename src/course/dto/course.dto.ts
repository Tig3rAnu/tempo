import { CourseLevel } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
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
  @IsEnum(CourseLevel)
  @IsNotEmpty()
  level: CourseLevel;
  @IsArray()
  @IsOptional()
  @IsString()
  readonly universities: string[];
}

export class UpdateCourseDto extends CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
