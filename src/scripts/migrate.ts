import fs from 'fs';
import path from 'path';
import { pool } from '../config/db';

async function migrate() {
  const sql = fs.readFileSync(path.join(__dirname, '../config/migrations.sql'), 'utf-8');
  await pool.query(sql);
  console.log('Migration complete');
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});