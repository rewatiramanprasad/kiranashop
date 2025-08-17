import knex from 'knex'
import config from './config.json'
// export const db = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: 'dues.sqlite3',
//   },
//   useNullAsDefault: true,
// })

export const db = knex({
  client: 'pg',
  connection: config.database.string,
  searchPath: ['knex', 'public'],
})
