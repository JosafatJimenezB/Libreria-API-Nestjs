import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    genre?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    author?: string

    @IsOptional()
    @IsString()
    publisher?: string

    @IsOptional()
    @IsNumber()
    pages?: number

    @IsOptional()
    @IsString()
    image_url?: string
}
