import { drizzle } from 'drizzle-orm/node-postgres'
import * as pg from 'pg'
import { databaseUrl } from './database-url'
import * as schema from './schemas/index'

export const pool = new pg.Pool({
	connectionString: databaseUrl,
})

export const db = drizzle(pool, { schema, logger: true })

export * from 'drizzle-orm'
export * from './schemas/index'
export { schema }
