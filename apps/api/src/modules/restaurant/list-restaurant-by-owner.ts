import { db, eq, restaurantTable, sql } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PaginationQuerySchema } from '@/utils/schemas/pagination-query-schema'
import type { ListRestaurantByOwnerSchema } from './list-restaurant-by-owner-schema'

export async function listRestaurantByOwnerModule(
	request: FastifyRequest<{
		Params: ListRestaurantByOwnerSchema
		Querystring: PaginationQuerySchema
	}>,
	reply: FastifyReply,
) {
	const { ownerId } = request.params
	const { page, limit } = request.query

	const offset = (page - 1) * limit

	const dataRestaurantsPromise = db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.ownerId, ownerId))
		.limit(limit)
		.offset(offset)

	const countRestaurantsPromise = db
		.select({ count: sql<number>`count(*)` })
		.from(restaurantTable)
		.where(eq(restaurantTable.ownerId, ownerId))

	const [restaurants, countResult] = await Promise.all([
		dataRestaurantsPromise,
		countRestaurantsPromise,
	])

	const totalCount = Number(countResult[0]?.count ?? 0)

	return reply.status(200).send({
		data: restaurants,
		meta: {
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	})
}
