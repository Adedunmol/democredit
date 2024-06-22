// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import { Knex } from 'knex'

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

export default config