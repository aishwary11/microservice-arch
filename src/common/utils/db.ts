import knex from 'knex';
const pass = process.env.DB_PASS || 'aish';
const db = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: pass,
    database: 'micro_services',
  },
  pool: { min: 0, max: 7 },
});

export default db;
