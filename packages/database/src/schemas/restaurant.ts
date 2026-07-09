import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

export const restaurantTable = pgTable('restaurants', {
	id: uuid('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: varchar('name', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 50 }).notNull().unique(),
	description: text('description').notNull(),

	document: varchar('document', { length: 50 }).notNull().unique(),

	ownerId: uuid('owner_id')
		.$defaultFn(() => uuidv7())
		.notNull(),

	street: varchar('street', { length: 255 }).notNull(),
	streetNumber: varchar('street_number', { length: 50 }).notNull(),
	complement: varchar('complement', { length: 255 }),
	neighborhood: varchar('neighborhood', { length: 255 }).notNull(),
	city: varchar('city', { length: 255 }).notNull(),
	state: varchar('state', { length: 50 }).notNull(),
	zipCode: varchar('zip_code', { length: 20 }).notNull(),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().notNull().$onUpdateFn(() => new Date()),
})
