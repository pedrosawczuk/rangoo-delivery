import { and, db, eq, productsTable, restaurantTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { ItemIdSchema } from '../../utils/schemas/item-id-schema'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'

type GetMenuItemParams = ItemIdSchema & RestaurantIdSchema

export async function getMenuItemModule(
	request: FastifyRequest<{ Params: GetMenuItemParams }>,
	reply: FastifyReply,
) {
	const { restaurantId, itemId } = request.params

	const [restaurantExists] = await db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.id, restaurantId))

	if (!restaurantExists) throw new NotFoundError('Restaurant Not Found')

	const [getMenuItemData] = await db
		.select()
		.from(productsTable)
		.where(
			and(
				eq(productsTable.restaurantId, restaurantId),
				eq(productsTable.id, itemId),
			),
		)

	if (!getMenuItemData) throw new NotFoundError('Item Not Found')

	return reply.status(200).send({ data: getMenuItemData })
}
