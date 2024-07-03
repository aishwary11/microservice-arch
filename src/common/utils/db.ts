import knex from 'knex';
const pass = process.env.DB_PASS;
const db = knex({
  client: process.env.DBClient,
  connection: {
    host: process.env.HOSTDB,
    user: process.env.DBUSER,
    port: 3306,
    password: pass,
    database: process.env.DATABASE,
  },
  pool: { min: 0, max: 7 },
});

export default db;
