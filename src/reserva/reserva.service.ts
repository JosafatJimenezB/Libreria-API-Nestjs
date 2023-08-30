import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Book } from 'src/book/entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservaService {


  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) { }

  async createReserva(createReservaDto: CreateReservaDto, userId: number): Promise<Reserva> {
    const { bookId, startDate, endDate, confirmed } = createReservaDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException()
    }

    const reserva = new Reserva()
    reserva.book = book;
    reserva.startDate = startDate;
    reserva.endDate = endDate;
    reserva.confirmed = confirmed;
    reserva.user = { id: userId } as any;


    await this.reservaRepository.save(reserva);
    return reserva;
  }

  async getReservaById(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({ where: { id: id }, relations: ['book', 'user'] })

    if (!reserva) {
      throw new NotFoundException()
    }

    return reserva;
  }

  async updateReserva(id: number, updateReservaDto: CreateReservaDto): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({ where: { id: id } });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
    }

    if (updateReservaDto.startDate) {
      reserva.startDate = updateReservaDto.startDate;
    }
    if (updateReservaDto.endDate) {
      reserva.endDate = updateReservaDto.endDate;
    }
    if (updateReservaDto.confirmed !== undefined) {
      reserva.confirmed = updateReservaDto.confirmed;
    }

    await this.reservaRepository.save(reserva);

    return reserva;
  }



  async deleteReserva(id: number): Promise<void> {
    const reserva = await this.reservaRepository.findOne({ where: { id: id } });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada.`);
    }

    await this.reservaRepository.remove(reserva);
  }


  async getUserReservas(userId: number): Promise<Reserva[]> {
    const reservas = await this.reservaRepository.find({ where: { id: userId }, relations: ['book', 'user'] });
    return reservas;
  }

}
