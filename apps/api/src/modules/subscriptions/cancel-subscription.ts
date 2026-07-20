import { db, eq, userSubscriptionsTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { SubscriptionIdSchema } from '../../utils/schemas/subscription-id-schema'

export async function cancelSubscriptionModule(
	request: FastifyRequest<{ Params: SubscriptionIdSchema }>,
	reply: FastifyReply,
) {
	const { subscriptionId } = request.params

	const [subscription] = await db
		.select({ id: userSubscriptionsTable.id })
		.from(userSubscriptionsTable)
		.where(eq(userSubscriptionsTable.id, subscriptionId))

	if (!subscription) throw new NotFoundError('Subscription not found')

	await db
		.update(userSubscriptionsTable)
		.set({ status: 'CANCELED' })
		.where(eq(userSubscriptionsTable.id, subscriptionId))

	return reply.status(204).send()
}
