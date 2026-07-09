import { db } from '@rangoo/database'
import { productsTable } from '@rangoo/database/src/schemas/products'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'
import type { CreateMenuItemSchema } from './create-menu-item-schema'

export async function createMenuItemModule(
	request: FastifyRequest<{
		Body: CreateMenuItemSchema
		Params: RestaurantIdSchema
	}>,
	reply: FastifyReply,
) {
	const {
		description,
		discountPriceInCents,
		isAvailable,
		isVegetarian,
		name,
		priceInCents,
	} = request.body
	const { restaurantId } = request.params

	const [newItem] = await db
		.insert(productsTable)
		.values({
			priceInCents,
			restaurantId,
			discountPriceInCents,
			isAvailable,
			isVegetarian,
			description,
			name,
		})
		.returning({ id: productsTable.id })

	return reply.status(201).send({ itemId: newItem.id })
}
