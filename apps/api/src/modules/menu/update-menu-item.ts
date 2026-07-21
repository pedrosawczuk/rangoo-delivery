import { and, db, eq, productsTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { ItemIdSchema } from '@/utils/schemas/item-id-schema'
import type { RestaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
import type { UpdateMenuItemSchema } from './update-menu-item-schema'

export async function updateMenuItemModule(
	request: FastifyRequest<{
		Body: UpdateMenuItemSchema
		Params: RestaurantIdSchema & ItemIdSchema
	}>,
	reply: FastifyReply,
) {
	const data = request.body

	const { restaurantId, itemId } = request.params

	const [updateItem] = await db
		.update(productsTable)
		.set(data)
		.where(
			and(
				eq(productsTable.id, itemId),
				eq(productsTable.restaurantId, restaurantId),
			),
		)
		.returning({ id: productsTable.id })

	if (!updateItem) throw new NotFoundError('Item or Restaurant Not Exists')

	return reply.status(200).send({ id: updateItem.id })
}
