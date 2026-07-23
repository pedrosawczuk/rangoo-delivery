import { db, sql, pool } from '@rangoo/database'
import { beforeEach, beforeAll, afterAll } from 'vitest'
import { app } from '../app'

beforeAll(async () => {
	await app.ready()
})

afterAll(async () => {
	await app.close()
	await pool.end()
})

beforeEach(async () => {
	await db.execute(sql`
		DO $$ DECLARE
			r RECORD;
		BEGIN
			FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
				EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
			END LOOP;
		END $$;
	`)
})
