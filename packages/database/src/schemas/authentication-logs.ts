import {
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'
import { usersTable } from './users'

export const authStatusEnum = pgEnum('auth_status', [
	'SUCCESS',
	'FAILED',
	'BLOCKED',
])

export const authenticationLogsTable = pgTable('authentication_logs', {
	id: uuid('id')
		.primaryKey()
		.$default(() => uuidv7()),

	userId: uuid('user_id').references(() => usersTable.id, {
		onDelete: 'set null',
	}),
	emailAttempt: varchar('email_attempt', { length: 255 }).notNull(),

	ipAddress: varchar('ip_address', { length: 45 }),
	userAgent: text('user_agent'),

	status: authStatusEnum('status').notNull(),

	createdAt: timestamp('created_at').notNull().defaultNow(),
})
