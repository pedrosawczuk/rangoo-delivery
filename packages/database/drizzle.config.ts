import { env } from '@rangoo/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	out: './drizzle',
	schema: './src/schemas/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL!,
	},
})
