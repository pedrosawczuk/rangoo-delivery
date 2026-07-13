import type { FastifyInstance } from 'fastify'
import { userIdSchema } from '../../utils/schemas/user-id-schema'
import { createUserAddressModule } from './create-user-address'
import { createUserAddressSchema } from './create-user-address-schema'

export function userRoutes(app: FastifyInstance) {
	app.post(
		'/:userId/address',
		{
			schema: {
				params: userIdSchema,
				body: createUserAddressSchema,
			},
		},
		createUserAddressModule,
	)
}
