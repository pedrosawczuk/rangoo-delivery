import type { FastifyInstance } from 'fastify'
import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import { createNewRestaurantModule } from './create-new-restaurant'
import { createNewRestaurantSchema } from './create-new-restaurant-schema'
import { listRestaurantByOwnerModule } from './list-restaurant-by-owner'
import { listRestaurantByOwnerSchema } from './list-restaurant-by-owner-schema'

export function restaurantRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{ schema: { body: createNewRestaurantSchema } },
		createNewRestaurantModule,
	)
	app.get(
		'/owner/:ownerId',
		{
			schema: {
				params: listRestaurantByOwnerSchema,
				querystring: paginationQuerySchema,
			},
		},
		listRestaurantByOwnerModule,
	)
}
