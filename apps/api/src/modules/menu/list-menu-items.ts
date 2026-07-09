import { db, eq, productsTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'
export async function listMenuItemsModule(
	request: FastifyRequest<{ Params: RestaurantIdSchema }>,
	reply: FastifyReply,
) {
	const { restaurantId } = request.params

	const [menuItems] = await db
		.select()
		.from(productsTable)
		.where(eq(productsTable.restaurantId, restaurantId))

	if (!menuItems)
		return reply.status(404).send({ message: 'Restaurant Not Found' })

	return reply.status(200).send({ data: menuItems })
}
