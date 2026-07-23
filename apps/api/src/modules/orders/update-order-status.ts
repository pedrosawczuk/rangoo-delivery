import { NotFoundError } from '@/core/errors'
import type { OrderIdSchema } from '@/utils/schemas/order-id-schema'
import type { RestaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
import { and, db, eq, ordersTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { UpdateOrderStatusSchema } from './update-order-status-schema'

export async function updateOrderStatusModule(
	request: FastifyRequest<{
		Params: RestaurantIdSchema & OrderIdSchema
		Body: UpdateOrderStatusSchema
	}>,
	reply: FastifyReply,
) {
	const { restaurantId, orderId } = request.params
	const { status } = request.body

	const [order] = await db
		.select({ id: ordersTable.id })
		.from(ordersTable)
		.where(
			and(
				eq(ordersTable.id, orderId),
				eq(ordersTable.restaurantId, restaurantId),
			),
		)

	if (!order) {
		throw new NotFoundError('Order not found or unauthorized')
	}

	await db
		.update(ordersTable)
		.set({ status })
		.where(eq(ordersTable.id, orderId))

	return reply.status(204).send()
}
