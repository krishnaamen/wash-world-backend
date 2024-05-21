import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { jwtConstants } from 'src/auth/constants';
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createVehicleDto: CreateVehicleDto) {
    console.log(req.user);
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
  @UseGuards(JwtAuthGuard)
  @Post('test')
  async Test(@Request() req) {
    const user = req.user;
    console.log('User from guard', user);
    //createVehicleDto.user = user;
    console.log(req.headers.authorization);

    return user;
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.vehicleService.findAll(req.user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vehicleService.findOne(+id);
  // }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.update(+id, createVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
