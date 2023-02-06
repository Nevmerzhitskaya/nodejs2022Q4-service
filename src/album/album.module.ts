import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DBService } from 'utils/DB/DB.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DBService]
})
export class AlbumModule {}
