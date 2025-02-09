import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsNumber,
  IsISO8601,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  lastName: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;
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
