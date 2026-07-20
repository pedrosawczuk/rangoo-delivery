import {
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'
import { usersTable } from './users'

export const sessionsTable = pgTable('sessions', {
	id: uuid('id')
		.primaryKey()
		.$default(() => uuidv7()),
	userId: uuid('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),

	refreshToken: varchar('refresh_token', { length: 255 }).notNull().unique(),

	ipAddress: varchar('ip_address', { length: 45 }),
	userAgent: text('user_agent'),

	isRevoked: boolean('is_revoked').notNull().default(false),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})
