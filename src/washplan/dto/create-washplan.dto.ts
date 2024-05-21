import { IsString } from 'class-validator';

export class CreateWashplanDto {
  @IsString()
  washplanName: string;
  washplanPrice: number;
}
