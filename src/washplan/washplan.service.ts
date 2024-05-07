import { Injectable } from '@nestjs/common';
import { CreateWashplanDto } from './dto/create-washplan.dto';
import { UpdateWashplanDto } from './dto/update-washplan.dto';

@Injectable()
export class WashplanService {
  create(createWashplanDto: CreateWashplanDto) {
    return 'This action adds a new washplan';
  }

  findAll() {
    return `This action returns all washplan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} washplan`;
  }

  update(id: number, updateWashplanDto: UpdateWashplanDto) {
    return `This action updates a #${id} washplan`;
  }

  remove(id: number) {
    return `This action removes a #${id} washplan`;
  }
}
