import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, UseInterceptors, ClassSerializerInterceptor, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
// import { User } from './interfaces/user.interface';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
  }
  
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() UpdatePasswordDto: UpdatePasswordDto): Promise<UserDto> {
   console.log('UpdatePasswordDto',UpdatePasswordDto);
   
    return await this.usersService.update(id, UpdatePasswordDto);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.remove(id);
  }
}
