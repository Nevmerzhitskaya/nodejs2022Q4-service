import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateArtistDto {
    id: string; // uuid v4
    
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    grammy: boolean;    
}
