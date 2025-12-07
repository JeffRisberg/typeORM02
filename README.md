# Library Management - NestJS + TinyORM

A simple library management API built with NestJS and a custom lightweight ORM (TinyORM) using SQLite.

## Features

- **CRUD Operations** for authors and books
- **Author Entity** with name, bio, and birth year fields
- **Book Entity** with title, ISBN, publication year, and author relationship
- **RESTful API** endpoints
- **SQLite Database** for data persistence
- **Custom TinyORM** implementation with base repository pattern

## Installation

```bash
npm install
```

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Or build and run:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authors

#### Create Author
```bash
POST /authors
Content-Type: application/json

{
  "name": "J.K. Rowling",
  "bio": "British author best known for the Harry Potter series",
  "birth_year": 1965
}
```

#### Get All Authors
```bash
GET /authors
```

#### Get Single Author
```bash
GET /authors/:id
```

#### Update Author
```bash
PUT /authors/:id
Content-Type: application/json

{
  "bio": "Updated biography text"
}
```

#### Delete Author
```bash
DELETE /authors/:id
```

### Books

#### Create Book
```bash
POST /books
Content-Type: application/json

{
  "title": "Harry Potter and the Philosopher's Stone",
  "publication_date": "01-01-1997",
  "page_count": 223,
  "author_id": 1
}
```

#### Get All Books
```bash
GET /books
```

#### Get Single Book
```bash
GET /books/:id
```

#### Update Book
```bash
PUT /books/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "publicationYear": 1998
}
```

#### Delete Book
```bash
DELETE /books/:id
```

## Example Usage with cURL

### Author Examples

Create an author:
```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"George Orwell","bio":"English novelist and essayist","birth_year":1903}'
```

Get all authors:
```bash
curl http://localhost:3000/authors
```

Get specific author:
```bash
curl http://localhost:3000/authors/1
```

Update author:
```bash
curl -X PUT http://localhost:3000/authors/1 \
  -H "Content-Type: application/json" \
  -d '{"bio":"Updated biography for George Orwell"}'
```

Delete author:
```bash
curl -X DELETE http://localhost:3000/authors/1
```

### Book Examples

Create a book:
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","publication_date":"01-02-1949","author_id":1,"page_count":328}'
```

Get all books:
```bash
curl http://localhost:3000/books
```

Get specific book:
```bash
curl http://localhost:3000/books/1
```

Update book:
```bash
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Nineteen Eighty-Four"}'
```

Delete book:
```bash
curl -X DELETE http://localhost:3000/books/1
```

## Project Structure

```
typeORM2/
├── src/
│   ├── database/
│   │   ├── base.repository.ts       # Base repository with CRUD operations
│   │   ├── database.service.ts      # Database connection and queries
│   │   └── database.module.ts       # Database module
│   ├── author/
│   │   ├── author.entity.ts         # Author interface
│   │   ├── author.repository.ts     # Author-specific repository
│   │   ├── author.service.ts        # Business logic
│   │   ├── author.controller.ts     # REST endpoints
│   │   └── author.module.ts         # Author module
│   ├── book/
│   │   ├── book.entity.ts           # Book interface
│   │   ├── book.repository.ts       # Book-specific repository
│   │   ├── book.service.ts          # Business logic
│   │   ├── book.controller.ts       # REST endpoints
│   │   └── book.module.ts           # Book module
│   ├── app.module.ts                # Root module
│   └── main.ts                      # Bootstrap file
├── package.json
├── tsconfig.json
└── README.md
```

## Database

The application uses SQLite with a file-based database (`library.db`). The schemas are automatically created on startup:

```sql
CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  bio TEXT,
  birth_year INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  isbn TEXT NOT NULL,
  publication_year INTEGER,
  author_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id)
)
```

## TinyORM Architecture

The custom TinyORM implementation consists of:

1. **DatabaseService**: Manages SQLite connection and provides low-level query methods
2. **BaseRepository**: Abstract class providing generic CRUD operations
3. **AuthorRepository**: Extends BaseRepository for author-specific operations
4. **BookRepository**: Extends BaseRepository for book-specific operations

This architecture provides a lightweight, type-safe ORM pattern without heavy dependencies.
