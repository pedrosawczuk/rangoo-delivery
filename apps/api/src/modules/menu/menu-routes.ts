import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { itemIdSchema } from '../../utils/schemas/item-id-schema'
import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import { restaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'
import { createMenuItemModule } from './create-menu-item'
import { createMenuItemSchema } from './create-menu-item-schema'
import { deleteMenuItemModule } from './delete-menu-item'
import { getMenuItemModule } from './get-menu-item'
import { listMenuItemsModule } from './list-menu-items'

export function menuRoutes(app: FastifyInstance) {
	app.get(
		'/:restaurantId',
		{
			schema: {
				params: restaurantIdSchema,
				querystring: paginationQuerySchema,
			},
		},
		listMenuItemsModule,
	)
	app.get(
		'/:restaurantId/:itemId',
		{ schema: { params: z.intersection(restaurantIdSchema, itemIdSchema) } },
		getMenuItemModule,
	)
	app.delete(
		'/:restaurantId/:itemId',
		{ schema: { params: z.intersection(restaurantIdSchema, itemIdSchema) } },
		deleteMenuItemModule,
	)
	app.post(
		'/:restaurantId',
		{
			schema: { body: createMenuItemSchema, params: restaurantIdSchema },
		},
		createMenuItemModule,
	)
}
