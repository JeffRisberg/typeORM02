import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book | undefined> {
    return this.bookService.findById(Number(id));
  }

  @Post()
  async create(@Body() data: Partial<Book>): Promise<Book> {
    return this.bookService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Book>,
  ): Promise<Book | undefined> {
    return this.bookService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.bookService.delete(Number(id));
  }
}
