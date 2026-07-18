import { db, eq, productsTable, restaurantTable, sql } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { PaginationQuerySchema } from '@/utils/schemas/pagination-query-schema'
import type { RestaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
export async function listMenuItemsModule(
	request: FastifyRequest<{
		Params: RestaurantIdSchema
		Querystring: PaginationQuerySchema
	}>,
	reply: FastifyReply,
) {
	const { restaurantId } = request.params
	const { limit, page } = request.query

	const offset = (page - 1) * limit

	const [restaurantExists] = await db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.id, restaurantId))

	if (!restaurantExists) throw new NotFoundError('Restaurant Not Found')

	const menuItemsPromise = db
		.select()
		.from(productsTable)
		.where(eq(productsTable.restaurantId, restaurantId))
		.limit(limit)
		.offset(offset)

	const countMenuItemsPromise = db
		.select({ count: sql<number>`count(*)` })
		.from(productsTable)
		.where(eq(productsTable.restaurantId, restaurantId))

	const [menuItems, countMenuItems] = await Promise.all([
		menuItemsPromise,
		countMenuItemsPromise,
	])

	const totalCount = Number(countMenuItems[0]?.count ?? 0)

	return reply.status(200).send({
		data: menuItems,
		meta: {
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	})
}
