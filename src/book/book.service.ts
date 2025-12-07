import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findById(id: number): Promise<Book | undefined> {
    return this.bookRepository.findById(id);
  }

  async create(data: Partial<Book>): Promise<Book> {
    return this.bookRepository.create(data);
  }

  async update(id: number, data: Partial<Book>): Promise<Book | undefined> {
    return this.bookRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.bookRepository.delete(id);
  }
}
