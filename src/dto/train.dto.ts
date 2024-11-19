import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class AddTrainDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @IsDateString()
  @IsNotEmpty()
  endTime: Date;

  @IsNumber()
  @IsNotEmpty()
  totalSeats: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdateTrainDto {
  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsNumber()
  totalSeats: number;

  @IsBoolean()
  isActive: boolean;
}

export class TrainDto {
  trainId: number;

  name: string;

  source: string;

  destination: string;

  startTime: Date;

  endTime: Date;

  totalSeats: number;
}
