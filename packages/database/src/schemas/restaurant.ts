import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'
import { restaurantCategoriesTable } from './restaurant-categories'
import { usersTable } from './users'

export const restaurantTable = pgTable('restaurants', {
	id: uuid('id')
		.primaryKey()
		.$defaultFn(() => v7()),
	name: varchar('name', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 50 }).notNull().unique(),
	description: text('description').notNull(),

	document: varchar('document', { length: 50 }).notNull().unique(),

	ownerId: uuid('owner_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),

	street: varchar('street', { length: 255 }).notNull(),
	streetNumber: varchar('street_number', { length: 50 }).notNull(),
	complement: varchar('complement', { length: 255 }),
	neighborhood: varchar('neighborhood', { length: 255 }).notNull(),
	city: varchar('city', { length: 255 }).notNull(),
	state: varchar('state', { length: 50 }).notNull(),
	zipCode: varchar('zip_code', { length: 20 }).notNull(),

	categoryId: uuid('category_id')
		.notNull()
		.references(() => restaurantCategoriesTable.id, { onDelete: 'restrict' }),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
