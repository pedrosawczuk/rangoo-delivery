import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { addressIdSchema } from '../../utils/schemas/address-id-schema'
import { userIdSchema } from '../../utils/schemas/user-id-schema'
import { updateUserAddressSchema } from './update-user-address-schema'
import { createUserAddressModule } from './create-user-address'
import { createUserAddressSchema } from './create-user-address-schema'
import { deleteUserAddresModule } from './delete-user-address'
import { listUserAddressModule } from './list-user-address'
import { updateUserAddressModule } from './update-user-address'

import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'

export function userRoutes(app: FastifyInstance) {
	app.get(
		'/:userId/address',
		{ schema: { params: userIdSchema, querystring: paginationQuerySchema } },
		listUserAddressModule,
	)
	app.put(
		'/:userId/address/:addressId',
		{
			schema: {
				params: z.intersection(userIdSchema, addressIdSchema),
				body: updateUserAddressSchema,
			},
		},
		updateUserAddressModule,
	)
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
