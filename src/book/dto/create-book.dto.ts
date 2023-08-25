import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    genre: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    author: string

    @IsNotEmpty()
    @IsString()
    publisher: string

    @IsNotEmpty()
    @IsNumber()
    pages: number

    @IsNotEmpty()
    @IsString()
    image_url: string
}
