import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateUserDto {
    id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    login: string;

    @ApiProperty()
    @IsNotEmpty()
    password?: string;

    version: number;
    createdAt: number;
    updatedAt: number;  
}

export class UserDto {
    @ApiProperty()
    @IsUUID()
    id: string; // uuid v4

    @ApiProperty()
    login: string;

    @ApiProperty()
    version: number; // integer number, increments on update

    @ApiProperty()
    createdAt: number; // timestamp of creation

    @ApiProperty()
    updatedAt: number; // timestamp of last update
    
    @ApiProperty()
    @Exclude({ toPlainOnly: true })
    password?: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
