import { env } from '@rangoo/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

async function runMigrations() {
	console.log('⏳ Iniciando migrations...')

	const pool = new Pool({ connectionString: env.DATABASE_URL })
	const db = drizzle(pool)

	try {
		await migrate(db, { migrationsFolder: './drizzle' })
		console.log('✅ Migrations concluídas com sucesso!')
	} catch (error) {
		console.error('❌ Erro brutal aplicando migrations:', error)
	} finally {
		await pool.end()
		process.exit(0)
	}
}

runMigrations()
