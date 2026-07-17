import {
	db,
	eq,
	restaurantMembersTable,
	restaurantTable,
	sql,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { PaginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'

export async function listRestaurantMembersModule(
	request: FastifyRequest<{
		Params: RestaurantIdSchema
		Querystring: PaginationQuerySchema
	}>,
	reply: FastifyReply,
) {
	const { restaurantId } = request.params
	const { page, limit } = request.query

	const [restaurant] = await db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.id, restaurantId))

	if (!restaurant) throw new NotFoundError('Restaurant not found')

	const offset = (page - 1) * limit

	const dataMembersPromise = db
		.select()
		.from(restaurantMembersTable)
		.where(eq(restaurantMembersTable.restaurantId, restaurantId))
		.limit(limit)
		.offset(offset)

	const countMembersPromise = db
		.select({ count: sql<number>`count(*)` })
		.from(restaurantMembersTable)
		.where(eq(restaurantMembersTable.restaurantId, restaurantId))

	const [members, countResult] = await Promise.all([
		dataMembersPromise,
		countMembersPromise,
	])

	const totalCount = Number(countResult[0]?.count ?? 0)

	return reply.status(200).send({
		data: members,
		meta: {
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	})
}
