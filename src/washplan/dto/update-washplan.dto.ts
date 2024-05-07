import { PartialType } from '@nestjs/mapped-types';
import { CreateWashplanDto } from './create-washplan.dto';

export class UpdateWashplanDto extends PartialType(CreateWashplanDto) {}
