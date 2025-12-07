import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  async findById(id: number): Promise<Author | undefined> {
    return this.authorRepository.findById(id);
  }

  async create(data: Partial<Author>): Promise<Author> {
    return this.authorRepository.create(data);
  }

  async update(id: number, data: Partial<Author>): Promise<Author | undefined> {
    return this.authorRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.authorRepository.delete(id);
  }
}
