import knex, { Knex } from 'knex'
export const db = knex({
  client: 'pg',
  connection: process.env.connectionstring,
  // searchPath: ['knex', 'public'],
  pool: { min: 0, max: 10 },
})

