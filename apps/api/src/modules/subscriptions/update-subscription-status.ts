import { db, eq, userSubscriptionsTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { SubscriptionIdSchema } from '../../utils/schemas/subscription-id-schema'
import type { UpdateSubscriptionStatusSchema } from './update-subscription-status-schema'

export async function updateSubscriptionStatusModule(
	request: FastifyRequest<{
		Params: SubscriptionIdSchema
		Body: UpdateSubscriptionStatusSchema
	}>,
	reply: FastifyReply,
) {
	const { subscriptionId } = request.params
	const { status } = request.body

	const [subscription] = await db
		.select({ id: userSubscriptionsTable.id })
		.from(userSubscriptionsTable)
		.where(eq(userSubscriptionsTable.id, subscriptionId))

	if (!subscription) throw new NotFoundError('Subscription not found')

	await db
		.update(userSubscriptionsTable)
		.set({ status })
		.where(eq(userSubscriptionsTable.id, subscriptionId))

	return reply.status(204).send()
}
