import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'utils/DB/DB.service';
// import { UserEntity } from 'utils/DB/entities/DBUsers';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Injectable()
export class UsersService {
  constructor(private bdService: DBService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    createUserDto.version = 1;
    createUserDto.createdAt = +(new Date());
    createUserDto.updatedAt = +(new Date());
    const user : UserDto = await this.bdService.getDB().users.create(createUserDto);
    user.password = undefined;
    return user;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.bdService.getDB().users.findMany();
    users.map(el => el.password = undefined);
    return users;
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.bdService.getDB().users.findOne({key: "id", equals: id});

    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    user.password = undefined;
    return user;
  }

  async update(id: string, UpdatePasswordDto: UpdatePasswordDto) {
    const user : UserDto = await this.bdService.getDB().users.findOne({key: "id", equals: id});

    // if (UpdatePasswordDto.newPassword === '' || UpdatePasswordDto.newPassword === undefined || UpdatePasswordDto.oldPassword === '' || UpdatePasswordDto.oldPassword === undefined) {
      
    //   throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST);
    // }
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    if (user.password != UpdatePasswordDto.oldPassword) {
      
      throw new HttpException("OldPassword is wrong", HttpStatus.FORBIDDEN);
    }

    user.password = UpdatePasswordDto.newPassword;
    user.updatedAt = +(new Date());
    ++user.version; 
    this.bdService.getDB().users.change(id, user);

    user.password = undefined;
    return user;
  }

  async remove(id: string) {

    const user : UserDto = await this.bdService.getDB().users.findOne({key: "id", equals: id});

    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    await this.bdService.getDB().users.delete(id);
    user.password = undefined;
    return user;
  }
}
