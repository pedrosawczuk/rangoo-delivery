import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

export const productCategoriesTable = pgTable('product_categories', {
	id: uuid('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	name: varchar('name', { length: 100 }).notNull(),
	slug: varchar('slug', { length: 100 }).notNull().unique(),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
