import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

  constructor(@InjectRepository(Book)
  private readonly bookRepository: Repository<Book>

  ) { }




  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: {
        id: id
      }
    });
    if (!book) {
      throw new NotFoundException(`Libro con ${id} no encontrado`)
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: {
        id: id
      }
    })
    this.bookRepository.merge(book, updateBookDto);
    return await this.bookRepository.save(book);
  }

  remove(id: number) {
    return this.bookRepository.delete({ id })
  }
}
