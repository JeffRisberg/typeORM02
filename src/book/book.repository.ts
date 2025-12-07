import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../database/base.repository';
import { DatabaseService } from '../database/database.service';
import { Book } from './book.entity';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  constructor(db: DatabaseService) {
    super(db, 'books');
  }
}
