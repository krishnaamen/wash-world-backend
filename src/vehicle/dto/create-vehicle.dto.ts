import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Washplan } from '../../washplan/entities/washplan.entity';

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
