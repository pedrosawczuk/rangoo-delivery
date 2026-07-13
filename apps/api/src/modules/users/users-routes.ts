import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { addressIdSchema } from '../../utils/schemas/address-id-schema'
import { userIdSchema } from '../../utils/schemas/user-id-schema'
import { createUserAddressModule } from './create-user-address'
import { createUserAddressSchema } from './create-user-address-schema'
import { deleteUserAddresModule } from './delete-user-address'

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
	app.delete(
		'/:userId/address/:addressId',
		{
			schema: {
				params: z.intersection(userIdSchema, addressIdSchema),
			},
		},
		deleteUserAddresModule,
	)
}
