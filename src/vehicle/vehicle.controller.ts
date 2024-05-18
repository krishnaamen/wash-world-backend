import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    //private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Request() req, @Body() createVehicleDto: CreateVehicleDto) {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, 'secret') as jwt.JwtPayload; // Cast decoded to JwtPayload type
    console.log(decoded);
    const user = new User();
    user.id = Number(decoded.id);
    user.username = decoded.username;
    createVehicleDto.user = user;
    console.log(createVehicleDto);


    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
  //   return this.vehicleService.update(+id, updateVehicleDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
