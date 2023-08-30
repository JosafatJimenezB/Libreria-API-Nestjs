import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { Reserva } from './entities/reserva.entity';
import { Book } from 'src/book/entities/book.entity';

@Controller('reservas')
export class ReservaController {

  constructor(private readonly reservaService: ReservaService) { }

  @Post()
  createReserva(@Body() createReservaDto: CreateReservaDto, @Request() request): Promise<Reserva> {
    const userId = request.user.id;
    return this.reservaService.createReserva(createReservaDto, userId);
  }

  @Get(':id')
  getReservaById(@Param('id') id: number): Promise<Reserva> {
    return this.reservaService.getReservaById(id);
  }

  @Put(':id')
  updateReserva(@Param('id') id: number, @Body() updateReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaService.updateReserva(id, updateReservaDto);
  }

  @Delete(':id')
  deleteReserva(@Param('id') id: number): Promise<void> {
    return this.reservaService.deleteReserva(id);
  }

  @Get('user/:userId')
  getUserReservas(@Param('userId') userId: number): Promise<Reserva[]> {
    return this.reservaService.getUserReservas(userId);
  }
}
