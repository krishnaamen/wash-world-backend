import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from 'data.source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { WashplanModule } from './washplan/washplan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    AuthModule,
    VehicleModule,
    WashplanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
