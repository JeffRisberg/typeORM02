import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Author | undefined> {
    return this.authorService.findById(Number(id));
  }

  @Post()
  async create(@Body() data: Partial<Author>): Promise<Author> {
    return this.authorService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Author>,
  ): Promise<Author | undefined> {
    return this.authorService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.authorService.delete(Number(id));
  }
}
