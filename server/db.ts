'use server'
import knex, { Knex } from 'knex'
export const db = knex({
  client: 'pg',
  connection: process.env.CONNECTION_STRING,
  // connection: {
  //   connectString: process.env.CONNECTION_STRING,
  //   ssl: { rejectUnauthorized: false },
  // },
  // searchPath: ['knex', 'public'],
  pool: { min: 0, max: 10 },
})
