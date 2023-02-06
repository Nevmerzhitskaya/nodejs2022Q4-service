import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, Put, Query, ParseBoolPipe } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(@Param('id', new ParseUUIDPipe()) id: string,  @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.remove(id);
  }
}
