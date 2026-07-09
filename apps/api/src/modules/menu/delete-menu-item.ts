import { db } from '@rangoo/database'
import { productsTable } from '@rangoo/database/src/schemas/products'
import { and, eq } from 'drizzle-orm'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors/not-found-error'
import type { ItemIdSchema } from '../../utils/schemas/item-id-schema'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'

export async function deleteMenuItemModule(
	request: FastifyRequest<{
		Params: RestaurantIdSchema & ItemIdSchema
	}>,
	reply: FastifyReply,
) {
	const { restaurantId, itemId } = request.params

	const [deletedItem] = await db
		.delete(productsTable)
		.where(
			and(
				eq(productsTable.id, itemId),
				eq(productsTable.restaurantId, restaurantId),
			),
		)
		.returning({ id: productsTable.id })

	if (!deletedItem) {
		throw new NotFoundError('Menu item not found')
	}

	return reply.status(204).send()
}
