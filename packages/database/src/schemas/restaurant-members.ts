import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'
import { restaurantTable } from './restaurant'
import { usersTable } from './users'

export const userRole = pgEnum('role', [
	'OWNER',
	'MANAGER',
	'DELIVERY_DRIVER',
	'STAFF',
])

export const restaurantMembersTable = pgTable('restaurant_members', {
	id: uuid('id')
		.primaryKey()
		.$default(() => v7()),
	restaurantId: uuid('restaurant_id')
		.notNull()
		.references(() => restaurantTable.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	role: userRole('role').notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
