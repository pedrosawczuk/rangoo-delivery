import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'
import { restaurantTable } from './restaurant'
import { usersTable } from './users'
import { userAddressTable } from './users-address'

export const orderStatusEnum = pgEnum('order_status', [
	'PENDING_PAYMENT',
	'PREPARING',
	'OUT_FOR_DELIVERY',
	'DELIVERED',
	'CANCELED',
])

export const deliveryMethodEnum = pgEnum('delivery_method', ['DELIVERY', 'PICKUP'])

export const ordersTable = pgTable('orders', {
	id: uuid()
		.primaryKey()
		.$default(() => v7()),
	restaurantId: uuid('restaurant_id')
		.notNull()
		.references(() => restaurantTable.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	status: orderStatusEnum('status').notNull(),
	deliveryMethod: deliveryMethodEnum('delivery_method').notNull(),
	deliveryAddressId: uuid('delivery_address').references(
		() => userAddressTable.id,
	),
	totalPriceInCents: integer('total_price_in_cents').notNull(),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
