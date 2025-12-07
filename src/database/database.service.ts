import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { promisify } from 'util';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: sqlite3.Database;

  async onModuleInit() {
    await this.connect();
    await this.initializeSchema();
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database('./booktracker.db', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Connected to SQLite database');
          resolve();
        }
      });
    });
  }

  private async initializeSchema(): Promise<void> {
    const createAuthorsTableSQL = `
      CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        bio TEXT  NULL,
        birth_year INTEGER NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createBooksTableSQL = `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        publication_date TEXT NOT NULL,
        page_count INTEGER NOT NULL,
        author_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES authors(id)
      )
    `;

    return new Promise((resolve, reject) => {
      this.db.run(createAuthorsTableSQL, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Authors table initialized');
          this.db.run(createBooksTableSQL, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Books table initialized');
              resolve();
            }
          });
        }
      });
    });
  }

  async run(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }

  async get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as T);
        }
      });
    });
  }

  async all<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
