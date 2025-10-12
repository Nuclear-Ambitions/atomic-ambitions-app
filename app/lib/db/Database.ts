import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { DB } from './types'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
  // plugins: [new CamelCasePlugin()]
})