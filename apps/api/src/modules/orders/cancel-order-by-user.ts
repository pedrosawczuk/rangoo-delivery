import { ConflictError, NotFoundError } from '@/core/errors'
import type { OrderIdSchema } from '@/utils/schemas/order-id-schema'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'
import { and, db, eq, ordersTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function cancelOrderByUserModule(
	request: FastifyRequest<{ Params: UserIdSchema & OrderIdSchema }>,
	reply: FastifyReply,
) {
	const { userId, orderId } = request.params

	const [order] = await db
		.select({ id: ordersTable.id, status: ordersTable.status })
		.from(ordersTable)
		.where(and(eq(ordersTable.id, orderId), eq(ordersTable.userId, userId)))

	if (!order) {
		throw new NotFoundError('Order not found or unauthorized')
	}

	if (order.status === 'OUT_FOR_DELIVERY' || order.status === 'DELIVERED') {
		throw new ConflictError(
			'Cannot cancel an order that is already out for delivery or delivered',
		)
	}

	await db
		.update(ordersTable)
		.set({ status: 'CANCELED' })
		.where(eq(ordersTable.id, orderId))

	return reply.status(204).send()
}
