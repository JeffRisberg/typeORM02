import { Book } from '../book/book.entity';

export interface Author {
  id?: number;
  name: string;
  bio?: string;
  birth_year?: number;
  books?: Book[];
  created_at?: string;
  updated_at?: string;
}
