import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity'; // Import UserEntity

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Use TypeOrmModule
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],// Export UsersService for use in Middleware header etc
})
export class UsersModule {}
