import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { ownerIdSchema } from '../../utils/schemas/owner-id-schema'
import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import { restaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'
import { createRestaurantModule } from './create-restaurant'
import { createNewRestaurantSchema } from './create-restaurant-schema'
import { getRestaurantByOwnerModule } from './get-restaurant-by-owner'
import { listRestaurantByOwnerModule } from './list-restaurant-by-owner'

export function restaurantRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{ schema: { body: createNewRestaurantSchema } },
		createRestaurantModule,
	)
	app.get(
		'/owner/:ownerId',
		{
			schema: {
				params: ownerIdSchema,
				querystring: paginationQuerySchema,
			},
		},
		listRestaurantByOwnerModule,
	)
	app.get(
		'/owner/:ownerId/:restaurantId',
		{
			schema: {
				params: z.intersection(ownerIdSchema, restaurantIdSchema),
			},
		},
		getRestaurantByOwnerModule,
	)
}
