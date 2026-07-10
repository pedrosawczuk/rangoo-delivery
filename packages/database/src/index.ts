import { env } from '@rangoo/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as pg from 'pg'
import * as schema from './schemas/index'

const pool = new pg.Pool({
	connectionString: env.NODE_ENV === 'test' ? env.TEST_DATABASE_URL : env.DATABASE_URL,
})

export const db = drizzle(pool, { schema, logger: true })

export * from 'drizzle-orm'
export * from './schemas/index'
export { schema }
