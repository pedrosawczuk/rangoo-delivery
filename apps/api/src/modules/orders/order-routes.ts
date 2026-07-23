import { orderIdSchema } from '@/utils/schemas/order-id-schema'
import { restaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
import { userIdSchema } from '@/utils/schemas/user-id-schema'
import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { cancelOrderByUserModule } from './cancel-order-by-user'
import { createOrderModule } from './create-order'
import { createOrderSchema } from './create-order-schema'
import { getOrderByRestaurantModule } from './get-order-by-restaurant'
import { getOrderByUserModule } from './get-order-by-user'
import { listOrderByRestaurantModule } from './list-order-by-restaurant'
import { listOrderByUserModule } from './list-order-by-user'
import { listOrderQuerySchema } from './list-order-query-schema'
import { updateOrderStatusModule } from './update-order-status'
import { updateOrderStatusSchema } from './update-order-status-schema'

export function orderRoutes(app: FastifyInstance) {
	app.post('/', { schema: { body: createOrderSchema } }, createOrderModule)

	app.get(
		'/restaurants/:restaurantId/orders',
		{
			schema: {
				params: restaurantIdSchema,
				querystring: listOrderQuerySchema,
			},
		},
		listOrderByRestaurantModule,
	)
	app.get(
		'/users/:userId/orders',
		{
			schema: {
				params: userIdSchema,
				querystring: listOrderQuerySchema,
			},
		},
		listOrderByUserModule,
	)

	app.get(
		'/restaurants/:restaurantId/orders/:orderId',
		{ schema: { params: z.intersection(restaurantIdSchema, orderIdSchema) } },
		getOrderByRestaurantModule,
	)
	app.get(
		'/users/:userId/orders/:orderId',
		{ schema: { params: z.intersection(userIdSchema, orderIdSchema) } },
		getOrderByUserModule,
	)

	app.patch(
		'/restaurants/:restaurantId/orders/:orderId/status',
		{
			schema: {
				params: z.intersection(restaurantIdSchema, orderIdSchema),
				body: updateOrderStatusSchema,
			},
		},
		updateOrderStatusModule,
	)
	app.patch(
		'/users/:userId/orders/:orderId/cancel',
		{ schema: { params: z.intersection(userIdSchema, orderIdSchema) } },
		cancelOrderByUserModule,
	)
}
