import { NotFoundError } from '@/core/errors'
import type { OrderIdSchema } from '@/utils/schemas/order-id-schema'
import type { RestaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
import {
	and,
	db,
	eq,
	orderItemsTable,
	ordersTable,
	productsTable,
	userAddressTable,
	usersTable,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getOrderByRestaurantModule(
	request: FastifyRequest<{ Params: RestaurantIdSchema & OrderIdSchema }>,
	reply: FastifyReply,
) {
	const { restaurantId, orderId } = request.params

	const [order] = await db
		.select()
		.from(ordersTable)
		.where(
			and(
				eq(ordersTable.id, orderId),
				eq(ordersTable.restaurantId, restaurantId),
			),
		)

	if (!order) {
		throw new NotFoundError('Order not found ')
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

	const userPromise = db
		.select({
			id: usersTable.id,
			firstName: usersTable.firstName,
			lastName: usersTable.lastName,
			email: usersTable.email,
			phone: usersTable.phone,
		})
		.from(usersTable)
		.where(eq(usersTable.id, order.userId))

	const [items, [deliveryAddress], [customer]] = await Promise.all([
		itemsPromise,
		addressPromise,
		userPromise,
	])

	return reply.status(200).send({
		order,
		customer,
		items,
		deliveryAddress,
	})
}
