import { pool } from '../config/db';

export const ClickEventRepository = {
  async logClick(shortCode: string, ip: string, userAgent: string): Promise<void> {
    await pool.query(
      'INSERT INTO click_events (short_code, ip_address, user_agent) VALUES ($1, $2, $3)',
      [shortCode, ip, userAgent]
    );
  },
};