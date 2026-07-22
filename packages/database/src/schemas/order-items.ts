import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'
import { ordersTable } from './order'
import { productsTable } from './products'

export const orderItemsTable = pgTable('order_items', {
	id: uuid('id')
		.primaryKey()
		.$default(() => v7()),
	orderId: uuid('order_id')
		.notNull()
		.references(() => ordersTable.id),
	productId: uuid("product_id").notNull().references(() => productsTable.id),
	quantity: integer('quantity').notNull(),
	unitPriceInCents: integer('unit_price_in_cents').notNull(),

	createdAt: timestamp().defaultNow().notNull(),
})
