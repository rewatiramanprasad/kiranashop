'use server'
import knex from 'knex'
export const db = knex({
  client: 'pg',
  connection: process.env.CONNECTION_STRING,
  pool: { min: 0, max: 10 },
})

// connection: {
//   connectString: process.env.CONNECTION_STRING,
//   ssl: { rejectUnauthorized: false },
// },
// searchPath: ['knex', 'public'],