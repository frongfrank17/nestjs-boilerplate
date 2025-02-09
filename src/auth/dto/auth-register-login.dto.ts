import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
//import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsISO8601, IsNumber } from 'class-validator';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsNumber,
  IsISO8601,
} from 'class-validator';
import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;
  @ApiPropertyOptional({ example: 70 })
  @IsOptional()
  @Type(() => Number) // transforms incoming string to number
  @IsNumber({}, { message: 'weight must be a number' })
  weigth: number;
  @ApiPropertyOptional({ example: 170 })
  @IsOptional()
  @Type(() => Number) // transforms incoming string to number
  @IsNumber({}, { message: 'weight must be a number' })
  heigth: number;
  @ApiPropertyOptional({ example: '1990-01-01' })
  @IsOptional()
  @Type(() => Date)
  @IsISO8601({}, { message: 'birthdate must be a valid date' })
  birthdate: Date | null;
}
