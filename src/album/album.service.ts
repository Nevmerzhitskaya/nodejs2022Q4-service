import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'utils/DB/DB.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private bdService: DBService) {}
  
  async create(createAlbumDto: CreateAlbumDto) {
    return await this.bdService.getDB().album.create(createAlbumDto);
  }

  async findAll(): Promise<CreateAlbumDto[]> {
    return await this.bdService.getDB().album.findMany();
  }

  async findOne(id: string): Promise<CreateAlbumDto> {
    const album = await this.bdService.getDB().album.findOne({key: "id", equals: id});

    if (!album) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album : UpdateAlbumDto = await this.bdService.getDB().album.findOne({key: "id", equals: id});

    if (!album) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    
    return this.bdService.getDB().album.change(id, updateAlbumDto);
  }

  async remove(id: string) {
    const album : UpdateAlbumDto = await this.bdService.getDB().album.findOne({key: "id", equals: id});

    if (!album) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    
    return await this.bdService.getDB().album.delete(id);
  }
}
