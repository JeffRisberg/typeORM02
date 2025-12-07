import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../database/base.repository';
import { DatabaseService } from '../database/database.service';
import { Author } from './author.entity';

@Injectable()
export class AuthorRepository extends BaseRepository<Author> {
  constructor(db: DatabaseService) {
    super(db, 'authors');
  }
}
