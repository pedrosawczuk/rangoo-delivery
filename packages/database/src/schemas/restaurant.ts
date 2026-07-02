import { text } from 'drizzle-orm/pg-core'
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

export const restaurantSchema = pgTable('restaurants', {
	id: uuid('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: varchar('name', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 50 }).notNull().unique(),
	description: text('description').notNull(),

	ownerId: uuid('owner_id').$defaultFn(() => uuidv7()),

	street: varchar('street', { length: 255 }).notNull(),
	streetNumber: varchar('street_number', { length: 50 }).notNull(),
	complement: varchar('complement', { length: 255 }),
	neighborhood: varchar('neighborhood', { length: 255 }),
	city: varchar('city', { length: 255 }).notNull(),
	state: varchar('state', { length: 50 }).notNull(),
	zipCode: varchar('zip_code', { length: 20 }).notNull(),
})
