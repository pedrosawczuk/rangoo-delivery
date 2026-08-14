import { env } from '@rangoo/env'

export const databaseUrl =
	env.NODE_ENV === 'test' ? env.TEST_DATABASE_URL : env.DATABASE_URL
