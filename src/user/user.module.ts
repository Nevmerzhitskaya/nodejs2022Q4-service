import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { DBService } from 'utils/DB/DB.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DBService]
})
export class UsersModule {}
