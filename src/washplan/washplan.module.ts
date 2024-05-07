import { Module } from '@nestjs/common';
import { WashplanService } from './washplan.service';
import { WashplanController } from './washplan.controller';

@Module({
  controllers: [WashplanController],
  providers: [WashplanService],
})
export class WashplanModule {}
