import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'aish',
    database: 'micro_services',
  },
  pool: { min: 0, max: 7 },
});

export default db;
