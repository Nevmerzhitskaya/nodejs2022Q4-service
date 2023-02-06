import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; //    
}
