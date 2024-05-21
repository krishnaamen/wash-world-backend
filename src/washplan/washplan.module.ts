import { Module } from '@nestjs/common';
import { WashplanService } from './washplan.service';
import { WashplanController } from './washplan.controller';
import { Washplan } from './entities/washplan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, AuthModule, TypeOrmModule.forFeature([Washplan])],
  controllers: [WashplanController],
  providers: [WashplanService],
})
export class WashplanModule {}
