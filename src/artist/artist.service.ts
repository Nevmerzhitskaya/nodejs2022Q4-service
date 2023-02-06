import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'utils/DB/DB.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private bdService: DBService) {}

  async create(createArtistDto: CreateArtistDto): Promise<CreateArtistDto> {
    return await this.bdService.getDB().artist.create(createArtistDto);
  }

  async findAll(): Promise<CreateArtistDto[]> {
    return await this.bdService.getDB().artist.findMany();
  }

  async findOne(id: string) : Promise<CreateArtistDto>{
    const artist = await this.bdService.getDB().artist.findOne({key: "id", equals: id});

    if (!artist) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist : UpdateArtistDto = await this.bdService.getDB().artist.findOne({key: "id", equals: id});

    if (!artist) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    
    return this.bdService.getDB().artist.change(id, updateArtistDto);
  }

  async remove(id: string) {
    const artist : UpdateArtistDto = await this.bdService.getDB().artist.findOne({key: "id", equals: id});

    if (!artist) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    
    return await this.bdService.getDB().artist.delete(id);
  }
}
