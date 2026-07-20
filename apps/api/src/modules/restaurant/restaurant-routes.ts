import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { ownerIdSchema } from '../../utils/schemas/owner-id-schema'
import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import { restaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'
import { userIdSchema } from '../../utils/schemas/user-id-schema'
import { createRestaurantModule } from './create-restaurant'
import { createRestaurantMemberModule } from './create-restaurant-member'
import { createRestaurantMemberSchema } from './create-restaurant-member-schema'
import { createNewRestaurantSchema } from './create-restaurant-schema'
import { getRestaurantModule } from './get-restaurant'
import { getRestaurantByOwnerModule } from './get-restaurant-by-owner'
import { getRestaurantMemberModule } from './get-restaurant-member'
import { listRestaurantsModule } from './list-restaurants'
import { listRestaurantByOwnerModule } from './list-restaurant-by-owner'
import { listRestaurantMembersModule } from './list-restaurant-members'
import { updateRestaurantMemberModule } from './update-restaurant-member'
import { updateRestaurantMemberSchema } from './update-restaurant-member-schema'

export function restaurantRoutes(app: FastifyInstance) {
	app.get(
		'/',
		{ schema: { querystring: paginationQuerySchema } },
		listRestaurantsModule,
	)
	app.get(
		'/:restaurantId',
		{ schema: { params: restaurantIdSchema } },
		getRestaurantModule,
	)
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
	app.get(
		'/:restaurantId/members',
		{
			schema: {
				params: restaurantIdSchema,
				querystring: paginationQuerySchema,
			},
		},
		listRestaurantMembersModule,
	)
	app.post(
		'/:restaurantId/members',
		{
			schema: {
				params: restaurantIdSchema,
				body: z.intersection(createRestaurantMemberSchema, userIdSchema),
			},
		},
		createRestaurantMemberModule,
	)
	app.get(
		'/:restaurantId/members/:userId',
		{
			schema: {
				params: z.intersection(restaurantIdSchema, userIdSchema),
			},
		},
		getRestaurantMemberModule,
	)
	app.put(
		'/:restaurantId/members/:userId',
		{
			schema: {
				params: z.intersection(restaurantIdSchema, userIdSchema),
				body: updateRestaurantMemberSchema,
			},
		},
		updateRestaurantMemberModule,
	)
}
