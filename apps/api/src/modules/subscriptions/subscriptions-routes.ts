import type { FastifyInstance } from 'fastify'
import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import { subscriptionIdSchema } from '../../utils/schemas/subscription-id-schema'
import { cancelSubscriptionModule } from './cancel-subscription'
import { createSubscriptionModule } from './create-subscription'
import { createSubscriptionSchema } from './create-subscription-schema'
import { getSubscriptionModule } from './get-subscription'
import { listSubscriptionsModule } from './list-subscriptions'
import { updateSubscriptionStatusModule } from './update-subscription-status'
import { updateSubscriptionStatusSchema } from './update-subscription-status-schema'

export function subscriptionsRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{ schema: { body: createSubscriptionSchema } },
		createSubscriptionModule,
	)
	app.get(
		'/',
		{ schema: { querystring: paginationQuerySchema } },
		listSubscriptionsModule,
	)
	app.get(
		'/:subscriptionId',
		{ schema: { params: subscriptionIdSchema } },
		getSubscriptionModule,
	)
	app.patch(
		'/:subscriptionId/cancel',
		{ schema: { params: subscriptionIdSchema } },
		cancelSubscriptionModule,
	)
	app.patch(
		'/:subscriptionId/status',
		{
			schema: {
				params: subscriptionIdSchema,
				body: updateSubscriptionStatusSchema,
			},
		},
		updateSubscriptionStatusModule,
	)
}
