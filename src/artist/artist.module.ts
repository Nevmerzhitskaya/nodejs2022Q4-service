import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DBService } from 'utils/DB/DB.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DBService]
})
export class ArtistModule {}
