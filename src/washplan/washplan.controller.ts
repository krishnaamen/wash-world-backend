import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { WashplanService } from './washplan.service';
import { CreateWashplanDto } from './dto/create-washplan.dto';
import { UpdateWashplanDto } from './dto/update-washplan.dto';

@Controller('washplan')
export class WashplanController {
  constructor(private readonly washplanService: WashplanService) {}

  @Post()
  create(@Body() createWashplanDto: CreateWashplanDto) {
    return this.washplanService.create(createWashplanDto);
  }
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.washplanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washplanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWashplanDto: UpdateWashplanDto,
  ) {
    return this.washplanService.update(+id, updateWashplanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washplanService.remove(+id);
  }
}
