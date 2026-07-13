import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'
import { plansTable } from './plans'
import { usersTable } from './users'

export const userSubscriptionsStatusEnum = pgEnum('status', [
	'ACTIVE',
	'CANCELED',
	'PAST_DUE',
	'EXPIRED',
])

export const userSubscriptionsTable = pgTable('user_subscriptions', {
	id: uuid('id')
		.primaryKey()
		.$default(() => v7()),
	userId: uuid('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	planId: uuid('plan_id')
		.notNull()
		.references(() => plansTable.id, { onDelete: 'cascade' }),
	status: userSubscriptionsStatusEnum('status').notNull(),
	currentPeriodStart: timestamp('current_period_start').notNull(),
	currentPeriodEnd: timestamp('current_period_end').notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
