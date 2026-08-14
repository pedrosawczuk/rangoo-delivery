import { defineConfig } from 'drizzle-kit'
import { databaseUrl } from './src/database-url'

export default defineConfig({
	out: './drizzle',
	schema: './src/schemas/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: databaseUrl,
	},
	verbose: true,
})
