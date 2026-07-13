import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'

export const billingCycleEnum = pgEnum('billing_cycle', ['MONTHLY', 'YEARLY'])

export const plansTable = pgTable('plans', {
	id: uuid('id')
		.primaryKey()
		.$default(() => v7()),
	name: varchar('name').notNull(),
	priceInCents: integer('price_in_cents').notNull(),
	billingCycle: billingCycleEnum('billing_cycle').notNull(),
	active: boolean('active').notNull(),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.notNull()
		.$onUpdateFn(() => new Date()),
})
