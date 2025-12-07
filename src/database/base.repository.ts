import { DatabaseService } from './database.service';

export abstract class BaseRepository<T> {
  constructor(
    protected readonly db: DatabaseService,
    protected readonly tableName: string,
  ) {}

  async findAll(): Promise<T[]> {
    const sql = `SELECT * FROM ${this.tableName}`;
    return this.db.all<T>(sql);
  }

  async findById(id: number): Promise<T | undefined> {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    return this.db.get<T>(sql, [id]);
  }

  async create(data: Partial<T>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const columns = keys.join(', ');

    const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    const result = await this.db.run(sql, values);

    return this.findById(result.lastID) as Promise<T>;
  }

  async update(id: number, data: Partial<T>): Promise<T | undefined> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key) => `${key} = ?`).join(', ');

    const sql = `UPDATE ${this.tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await this.db.run(sql, [...values, id]);

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.db.run(sql, [id]);
    return result.changes > 0;
  }
}
