import { IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNumber()
  id: number;
  @IsString()
  licencePlateNumber: string;

  @IsString()
  model: string;

  @IsString()
  color: string;

  @IsString()
  year: string;
}
