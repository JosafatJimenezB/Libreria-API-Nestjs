import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateReservaDto {

    @IsNumber()
    @IsNotEmpty()
    bookId: number;

    @IsDate()
    @IsOptional()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate: Date;

    @IsBoolean()
    @IsOptional()
    confirmed: boolean;
}
