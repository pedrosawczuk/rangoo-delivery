import type { FastifyInstance } from 'fastify'
import { planIdSchema } from '@/utils/schemas/plan-id-schema'
import { userIdSchema } from '@/utils/schemas/user-id-schema'
import { createSubscriptionModule } from './create-subscription'

export function subscriptionsRoutes(app: FastifyInstance) {
	app.post(
		'/:userId',
		{
			schema: { params: userIdSchema, body: planIdSchema },
		},
		createSubscriptionModule,
	)
}
