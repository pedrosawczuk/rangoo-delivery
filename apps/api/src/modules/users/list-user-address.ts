import { db, eq, sql, userAddressTable, usersTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { PaginationQuerySchema } from '@/utils/schemas/pagination-query-schema'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'

export async function listUserAddressModule(
	request: FastifyRequest<{
		Params: UserIdSchema
		Querystring: PaginationQuerySchema
	}>,
	reply: FastifyReply,
) {
	const { userId } = request.params
	const { limit, page } = request.query

	const offset = (page - 1) * limit

	const [userExists] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userId))

	if (!userExists) {
		throw new NotFoundError('User not found')
	}

	const addressUserPromise = db
		.select()
		.from(userAddressTable)
		.where(eq(userAddressTable.userId, userId))
		.limit(limit)
		.offset(offset)
	const countAddressUserPromise = db
		.select({ count: sql<number>`count(*)` })
		.from(userAddressTable)
		.where(eq(userAddressTable.userId, userId))

	const [addressUser, countAddressUser] = await Promise.all([
		addressUserPromise,
		countAddressUserPromise,
	])

	const totalCount = Number(countAddressUser[0]?.count ?? 0)

	return reply.status(200).send({
		data: addressUser,
		meta: {
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	})
}
