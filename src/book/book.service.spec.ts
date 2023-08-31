import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Sample Title',
        genre: 'Sample Genre',
        description: 'Sample Description',
        author: 'Sample Author',
        publisher: 'Sample Publisher',
        pages: 200,
        image_url: 'sample-url',
      };

      const createdBook = new Book();
      jest.spyOn(bookRepository, 'create').mockReturnValue(createdBook);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(createdBook);

      const result = await bookService.create(createBookDto);
      expect(result).toBe(createdBook);
      expect(bookRepository.create).toHaveBeenCalledWith(createBookDto);
      expect(bookRepository.save).toHaveBeenCalledWith(createdBook);
    });
  });


  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books = [new Book(), new Book()];
      jest.spyOn(bookRepository, 'find').mockResolvedValue(books);

      const result = await bookService.findAll();
      expect(result).toBe(books);
      expect(bookRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const bookId = 1;
      const updateBookDto: UpdateBookDto = {
        title: 'New Title',
      };

      const existingBook = new Book();
      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(existingBook);
      jest.spyOn(bookRepository, 'merge');
      jest.spyOn(bookRepository, 'save').mockResolvedValue(existingBook);

      const result = await bookService.update(bookId, updateBookDto);
      expect(result).toBe(existingBook);
      expect(bookRepository.merge).toHaveBeenCalledWith(existingBook, updateBookDto);
      expect(bookRepository.save).toHaveBeenCalledWith(existingBook);
    });

    it('should throw NotFoundException if book not found', async () => {
      const bookId = 1;
      const updateBookDto: UpdateBookDto = {
        title: 'New Title',
      };

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(null);

      await expect(bookService.update(bookId, updateBookDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const bookId = 1;
      const deleteResult = { affected: 1 };

      jest.spyOn(bookRepository, 'delete').mockResolvedValue(deleteResult as any);

      const result = await bookService.remove(bookId);
      expect(result).toEqual(deleteResult);
    });
  });


});

