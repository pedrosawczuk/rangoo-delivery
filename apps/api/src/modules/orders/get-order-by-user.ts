import { NotFoundError } from '@/core/errors'
import type { OrderIdSchema } from '@/utils/schemas/order-id-schema'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'
import {
	and,
	db,
	eq,
	orderItemsTable,
	ordersTable,
	productsTable,
	userAddressTable,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getOrderByUserModule(
	request: FastifyRequest<{ Params: UserIdSchema & OrderIdSchema }>,
	reply: FastifyReply,
) {
	const { userId, orderId } = request.params

	const [order] = await db
		.select()
		.from(ordersTable)
		.where(and(eq(ordersTable.id, orderId), eq(ordersTable.userId, userId)))

	if (!order) {
		throw new NotFoundError('Order not found')
	}

	const itemsPromise = db
		.select({
			id: orderItemsTable.id,
			quantity: orderItemsTable.quantity,
			unitPriceInCents: orderItemsTable.unitPriceInCents,
			productId: productsTable.id,
			productName: productsTable.name,
		})
		.from(orderItemsTable)
		.leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id))
		.where(eq(orderItemsTable.orderId, orderId))

	const addressPromise = order.deliveryAddressId
		? db
				.select()
				.from(userAddressTable)
				.where(eq(userAddressTable.id, order.deliveryAddressId))
		: Promise.resolve([null])

	const [items, [deliveryAddress]] = await Promise.all([
		itemsPromise,
		addressPromise,
	])

	return reply.status(200).send({
		order,
		items,
		deliveryAddress,
	})
}
