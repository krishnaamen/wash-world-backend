import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
//import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HttpService } from '@nestjs/axios';
import { User } from '../users/entities/user.entity';
import { Washplan } from '../washplan/entities/washplan.entity';
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

  async getWashPlanByVehicleId(vehicleId: number): Promise<Washplan> {
    const vehicle = await this.userRepository.findOne({
      where: { id: vehicleId },
      relations: ['washplan'],
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    console.log('vehicle.washplan service', vehicle.washplan);
    return vehicle.washplan;
  }

  async update(id: number, createVehicleDto: CreateVehicleDto) {
    console.log('update service dto ', createVehicleDto);
    const response = await this.userRepository.update(id, createVehicleDto);
    console.log('update service response ', response);
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
