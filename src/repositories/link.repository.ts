import { pool } from '../config/db';

export interface Link {
  id: number;
  short_code: string;
  original_url: string;
  user_id: number | null;
  created_at: Date;
}

export const LinkRepository = {
  async create(originalUrl: string, userId: number | null): Promise<{ id: number }> {
    const result = await pool.query(
      'INSERT INTO links (short_code, original_url, user_id) VALUES ($1, $2, $3) RETURNING id',
      ['pending', originalUrl, userId] // placeholder, we update short_code after we know the id
    );
    return result.rows[0];
  },

  async setShortCode(id: number, shortCode: string): Promise<void> {
    await pool.query('UPDATE links SET short_code = $1 WHERE id = $2', [shortCode, id]);
  },

  async findByCode(code: string): Promise<Link | null> {
    const result = await pool.query('SELECT * FROM links WHERE short_code = $1', [code]);
    return result.rows[0] || null;
  },
};