import { db, userSubscriptionsTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PlanIdSchema } from '../../utils/schemas/plan-id-schema'
import type { UserIdSchema } from '../../utils/schemas/user-id-schema'

export async function createSubscriptionModule(
	request: FastifyRequest<{ Params: UserIdSchema; Body: PlanIdSchema }>,
	reply: FastifyReply,
) {
	const { userId } = request.params
	const { planId } = request.body

	const CURRENT_PERIOD_START = new Date()
	const CURRENT_PERIOD_END = new Date()

	CURRENT_PERIOD_END.setDate(CURRENT_PERIOD_START.getDate() + 30)

	const [subscription] = await db
		.insert(userSubscriptionsTable)
		.values({
			userId,
			currentPeriodStart: CURRENT_PERIOD_START,
			currentPeriodEnd: CURRENT_PERIOD_END,
			planId,
			status: 'ACTIVE',
		})
		.returning()

	return reply.status(201).send({ data: subscription })
}
