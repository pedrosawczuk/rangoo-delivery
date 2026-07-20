import {
	db,
	eq,
	plansTable,
	userSubscriptionsTable,
	usersTable,
} from '@rangoo/database'
import dayjs from 'dayjs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { CreateSubscriptionSchema } from './create-subscription-schema'

export async function createSubscriptionModule(
	request: FastifyRequest<{ Body: CreateSubscriptionSchema }>,
	reply: FastifyReply,
) {
	const { userId, planId } = request.body

	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userId))

	if (!user) throw new NotFoundError('User not found')

	const [plan] = await db
		.select()
		.from(plansTable)
		.where(eq(plansTable.id, planId))

	if (!plan) throw new NotFoundError('Plan not found')

	const currentPeriodStart = dayjs().toDate()
	const currentPeriodEnd =
		plan.billingCycle === 'MONTHLY'
			? dayjs().add(30, 'day').toDate()
			: dayjs().add(1, 'year').toDate()

	const [subscription] = await db
		.insert(userSubscriptionsTable)
		.values({
			userId,
			planId,
			status: 'ACTIVE',
			currentPeriodStart,
			currentPeriodEnd,
		})
		.returning({ id: userSubscriptionsTable.id })

	return reply.status(201).send({ id: subscription.id })
}
