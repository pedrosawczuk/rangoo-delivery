import {
	boolean,
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'
import { productCategoriesTable } from './product-categories'
import { restaurantTable } from './restaurant'

export const productsTable = pgTable('products', {
	id: uuid('id')
		.primaryKey()
		.$default(() => uuidv7()),
	name: varchar('name', { length: 100 }).notNull(),
	description: varchar('description').notNull(),

	isAvailable: boolean('is_available').notNull().default(true),
	isVegetarian: boolean('is_vegetarian').notNull().default(false),

	restaurantId: uuid('restaurant_id')
		.notNull()
		.references(() => restaurantTable.id, { onDelete: 'cascade' }),

	priceInCents: integer('price_in_cents').notNull(),
	discountPriceInCents: integer('discount_price_in_cents'),

	categoryId: uuid('category_id')
		.notNull()
		.references(() => productCategoriesTable.id, { onDelete: 'restrict' }),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
