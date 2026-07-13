import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

export const usersTable = pgTable('users', {
	id: uuid('id')
		.primaryKey()
		.$default(() => uuidv7()),

	firstName: varchar('first_name').notNull(),
	lastName: varchar('last_name').notNull(),
	phone: varchar('phone').notNull().unique(),
	document: varchar('document').notNull().unique(),

	passwordHash: text('password_hash').notNull(),

	email: varchar('email').notNull().unique(),

	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdateFn(() => new Date()),
})
