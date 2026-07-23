import { NotFoundError } from '@/core/errors'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'
import {
	and,
	db,
	desc,
	eq,
	inArray,
	orderItemsTable,
	ordersTable,
	sql,
	usersTable,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ListOrderQuerySchema } from './list-order-query-schema'

export async function listOrderByUserModule(
	request: FastifyRequest<{
		Params: UserIdSchema
		Querystring: ListOrderQuerySchema
	}>,
	reply: FastifyReply,
) {
	const { userId } = request.params
	const { page, limit, status } = request.query
	const offset = (page - 1) * limit

	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userId))

	if (!user) {
		throw new NotFoundError('User not found')
	}

	const baseCondition = status
		? and(eq(ordersTable.userId, userId), eq(ordersTable.status, status))
		: eq(ordersTable.userId, userId)

	const dataPromise = db
		.select()
		.from(ordersTable)
		.where(baseCondition)
		.limit(limit)
		.offset(offset)
		.orderBy(desc(ordersTable.createdAt))

	const countPromise = db
		.select({ count: sql<number>`count(*)` })
		.from(ordersTable)
		.where(baseCondition)

	const [userOrders, countResult] = await Promise.all([
		dataPromise,
		countPromise,
	])

	const totalCount = Number(countResult[0]?.count ?? 0)

	if (userOrders.length === 0) {
		return reply.status(200).send({
			data: [],
			meta: {
				page,
				limit,
				totalCount,
				totalPages: Math.ceil(totalCount / limit),
			},
		})
	}

	const ordersId = userOrders.map((order) => order.id)

	const orderItems = await db
		.select()
		.from(orderItemsTable)
		.where(inArray(orderItemsTable.orderId, ordersId))

	const orders = userOrders.map((order) => {
		return {
			...order,
			items: orderItems.filter((item) => item.orderId === order.id),
		}
	})

	return reply.status(200).send({
		data: orders,
		meta: {
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit),
		},
	})
}
