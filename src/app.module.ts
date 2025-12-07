import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [DatabaseModule, AuthorModule, BookModule],
})
export class AppModule {}
