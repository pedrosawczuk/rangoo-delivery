import { and, db, eq, productsTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ItemIdSchema } from '../../utils/schemas/item-id-schema'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'

type GetMenuItemParams = ItemIdSchema & RestaurantIdSchema

export async function getMenuItemModule(
	request: FastifyRequest<{ Params: GetMenuItemParams }>,
	reply: FastifyReply,
) {
	const { restaurantId, itemId } = request.params

	const [getMenuItemData] = await db
		.select()
		.from(productsTable)
		.where(
			and(
				eq(productsTable.restaurantId, restaurantId),
				eq(productsTable.id, itemId),
			),
		)

	if (!getMenuItemData)
		return reply.status(404).send({ message: 'Menu Item Not Found' })

	return reply.status(200).send({ data: getMenuItemData })
}
