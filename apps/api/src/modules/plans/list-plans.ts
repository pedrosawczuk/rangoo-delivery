import { db, plansTable, sql } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PaginationQuerySchema } from '../../utils/schemas/pagination-query-schema'

export async function listPlansModule(
	request: FastifyRequest<{ Querystring: PaginationQuerySchema }>,
	reply: FastifyReply,
) {
	const { page, limit } = request.query

	const offset = (page - 1) * limit

	const dataPromise = db
		.select()
		.from(plansTable)
		.limit(limit)
		.offset(offset)

	const countPromise = db
		.select({ count: sql<number>`count(*)` })
		.from(plansTable)

	const [plans, countResult] = await Promise.all([
		dataPromise,
		countPromise,
	])

	const totalCount = Number(countResult[0]?.count ?? 0)

	return reply.status(200).send({
		data: plans,
		meta: {
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	})
}
