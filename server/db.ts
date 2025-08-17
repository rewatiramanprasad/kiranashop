import knex, { Knex } from 'knex'
// if (process.env.stage === 'development') {
//   // export const db = knex({
//   //   client: 'sqlite3',
//   //   connection: {
//   //     filename: 'dues.sqlite3',
//   //   },
//   //   useNullAsDefault: true,
//   // })
// }
let db: Knex

if (process.env.stage === 'production' || process.env.stage === 'development') {
  db = knex({
    client: 'pg',
    connection: process.env.connectionString,
    searchPath: ['knex', 'public'],
  })
}

export { db }
