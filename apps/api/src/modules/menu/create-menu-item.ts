import { db } from '@rangoo/database'
import { productsTable } from '@rangoo/database/src/schemas/products'
import { restaurantTable } from '@rangoo/database/src/schemas/restaurant'
import { eq } from 'drizzle-orm'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors/not-found-error'
import type { RestaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
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
		categoryId,
		name,
		priceInCents,
	} = request.body
	const { restaurantId } = request.params

	const [restaurantExists] = await db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.id, restaurantId))

	if (!restaurantExists) {
		throw new NotFoundError('Restaurant Not Found')
	}

	const [newItem] = await db
		.insert(productsTable)
		.values({
			priceInCents,
			restaurantId,
			discountPriceInCents,
			isAvailable,
			isVegetarian,
			categoryId,
			description,
			name,
		})
		.returning({ id: productsTable.id })

	return reply.status(201).send({ itemId: newItem.id })
}
