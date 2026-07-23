import { NotFoundError } from '@/core/errors'
import {
	db,
	eq,
	inArray,
	orderItemsTable,
	ordersTable,
	productsTable,
	userAddressTable,
	usersTable,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateOrderSchema } from './create-order-schema'

export async function createOrderModule(
	request: FastifyRequest<{ Body: CreateOrderSchema }>,
	reply: FastifyReply,
) {
	const {
		deliveryAddressId,
		deliveryMethod,
		items,
		restaurantId,
		status,
		totalPriceInCents,
		userId,
	} = request.body

	const [user, address] = await Promise.all([
		db.select().from(usersTable).where(eq(usersTable.id, userId)),
		deliveryAddressId
			? db
					.select()
					.from(userAddressTable)
					.where(eq(userAddressTable.id, deliveryAddressId))
			: null,
	])

	if (user.length === 0) {
		throw new NotFoundError('User not exists')
	}
	if (deliveryAddressId && address && address.length === 0) {
		throw new NotFoundError('Address not exists')
	}

	const productIds = items.map((item) => item.productId)

	const products = await db
		.select()
		.from(productsTable)
		.where(inArray(productsTable.id, productIds))

	if (products.length !== items.length) {
		throw new NotFoundError('One or more products were not found')
	}

	await db.transaction(async (tx) => {
		const [newOrder] = await tx
			.insert(ordersTable)
			.values({
				deliveryMethod,
				restaurantId,
				status,
				totalPriceInCents,
				userId,
				deliveryAddressId: deliveryAddressId || null,
			})
			.returning()

		const orderItems = items.map((item) => {
			const product = products.find((p) => p.id === item.productId)
			return {
				orderId: newOrder.id,
				productId: item.productId,
				quantity: item.quantity,
				unitPriceInCents: product!.priceInCents,
			}
		})

		await tx.insert(orderItemsTable).values(orderItems)
	})

	return reply.status(201).send()
}
