import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum, Min, Max } from 'class-validator';

export class CreateDumpsiteDto {
  @ApiProperty({
    description: 'Latitude of the dumpsite',
    type: Number,
    example: 40.7128,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the dumpsite',
    type: Number,
    example: -74.006,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'Capacity of the dumpsite in tons',
    type: Number,
    example: 500,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  capacity: number;

  @ApiProperty({
    description: 'Status of the dumpsite',
    type: String,
    enum: ['active', 'inactive'],
    example: 'active',
  })
  @IsEnum(['active', 'inactive'])
  @IsNotEmpty()
  status: string;
}
