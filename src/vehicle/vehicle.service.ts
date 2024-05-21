import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
//import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HttpService } from '@nestjs/axios';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private userRepository: Repository<Vehicle>,
    private httpService: HttpService,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    console.log(createVehicleDto);
    return this.userRepository.save(createVehicleDto);
  }
  findAll(user: User) {
    return this.userRepository.find({
      where: { user: { id: user.id } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  async update(id: number, createVehicleDto: CreateVehicleDto) {
    return await this.userRepository.update(id, createVehicleDto);
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
