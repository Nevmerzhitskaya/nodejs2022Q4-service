import { Module } from '@nestjs/common';
import { DBModule } from 'utils/DB/DB.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, DBModule],
})
export class AppModule {}
