import { Injectable } from '@nestjs/common';
import { CreateWashplanDto } from './dto/create-washplan.dto';
import { UpdateWashplanDto } from './dto/update-washplan.dto';
import { Washplan } from './entities/washplan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';

@Injectable()
export class WashplanService {
  constructor(
    @InjectRepository(Washplan)
    private readonly washplanRepository: Repository<Washplan>,
    private readonly httpService: HttpService,
  ) { }
  create(createWashplanDto: CreateWashplanDto) {
    return 'This action adds a new washplan';
  }

  findAll() {
    return this.washplanRepository.find();
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
