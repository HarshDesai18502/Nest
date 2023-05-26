import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateReportDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2023)
  @IsOptional()
  year: number;

  @IsLatitude()
  @IsOptional()
  lat: number;

  @IsLongitude()
  @IsOptional()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsOptional()
  milage: number;
}
