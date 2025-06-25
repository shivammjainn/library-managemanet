import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library',
  password: 'App4ever£',
  port: 5432,
});

export default pool;
