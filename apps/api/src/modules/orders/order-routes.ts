import { restaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
import type { FastifyInstance } from 'fastify'
import { createOrderModule } from './create-order'
import { createOrderSchema } from './create-order-schema'
import { listOrderByRestaurantModule } from './list-order-by-restaurant'

export function orderRoutes(app: FastifyInstance) {
	app.post('/', { schema: { body: createOrderSchema } }, createOrderModule)
	app.get(
		'/:restaurantId',
		{ schema: { params: restaurantIdSchema } },
		listOrderByRestaurantModule,
	)
}
