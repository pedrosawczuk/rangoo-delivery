import {
	boolean,
	pgEnum,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'
import { usersTable } from './users'

export const addressTypeEnum = pgEnum('address_type_enum', ['Work', 'Home'])

export const userAddressTable = pgTable('users_address', {
	id: uuid('id')
		.primaryKey()
		.$default(() => uuidv7()),
	userId: uuid('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),

	street: varchar('street', { length: 255 }).notNull(),
	streetNumber: varchar('street_number', { length: 50 }).notNull(),
	complement: varchar('complement', { length: 255 }),
	neighborhood: varchar('neighborhood', { length: 255 }).notNull(),
	city: varchar('city', { length: 255 }).notNull(),
	state: varchar('state', { length: 50 }).notNull(),
	zipCode: varchar('zip_code', { length: 20 }).notNull(),

	isDefault: boolean('is_default').notNull(),
	type: addressTypeEnum(),

	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdateFn(() => new Date()),
})
