import { db, restaurantCategoriesTable, sql } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PaginationQuerySchema } from '../../../utils/schemas/pagination-query-schema'

export async function listRestaurantCategoriesModule(
	request: FastifyRequest<{ Querystring: PaginationQuerySchema }>,
	reply: FastifyReply,
) {
	const { limit, page } = request.query
	const offset = (page - 1) * limit

	const categoriesPromise = db
		.select()
		.from(restaurantCategoriesTable)
		.limit(limit)
		.offset(offset)

	const countCategoriesPromise = db
		.select({ count: sql<number>`count(*)` })
		.from(restaurantCategoriesTable)

	const [categories, countCategories] = await Promise.all([
		categoriesPromise,
		countCategoriesPromise,
	])

	const totalCount = Number(countCategories[0]?.count ?? 0)

	return reply.status(200).send({
		data: categories,
		meta: {
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	})
}
