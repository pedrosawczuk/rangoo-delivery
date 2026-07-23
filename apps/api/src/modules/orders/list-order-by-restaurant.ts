import {
	and,
	db,
	desc,
	eq,
	inArray,
	orderItemsTable,
	ordersTable,
	restaurantTable,
	sql,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { RestaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
import type { ListOrderQuerySchema } from './list-order-query-schema'

export async function listOrderByRestaurantModule(
	request: FastifyRequest<{
		Params: RestaurantIdSchema
		Querystring: ListOrderQuerySchema
	}>,
	reply: FastifyReply,
) {
	const { restaurantId } = request.params
	const { page, limit, status } = request.query
	const offset = (page - 1) * limit

	const [restaurant] = await db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.id, restaurantId))

	if (!restaurant) {
		throw new NotFoundError('Restaurant not found')
	}

	const baseCondition = status
		? and(
				eq(ordersTable.restaurantId, restaurantId),
				eq(ordersTable.status, status),
			)
		: eq(ordersTable.restaurantId, restaurantId)

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

	const [restaurantOrders, countResult] = await Promise.all([
		dataPromise,
		countPromise,
	])

	const totalCount = Number(countResult[0]?.count ?? 0)

	if (restaurantOrders.length === 0) {
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

	const ordersId = restaurantOrders.map((order) => order.id)

	const orderItems = await db
		.select()
		.from(orderItemsTable)
		.where(inArray(orderItemsTable.orderId, ordersId))

	const orders = restaurantOrders.map((order) => {
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
