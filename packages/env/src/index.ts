import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envPath = path.resolve(__dirname, '../../../.env')
const result = dotenv.config({ path: envPath })

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.string(),
	TEST_DATABASE_URL: z.string(),
	JWT_SECRET: z.string().min(1),
})

export const env = envSchema.parse(process.env)
