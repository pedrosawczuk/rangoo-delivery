import { db, eq, restaurantTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'

export async function getRestaurantModule(
	request: FastifyRequest<{ Params: RestaurantIdSchema }>,
	reply: FastifyReply,
) {
	const { restaurantId } = request.params

	const [restaurant] = await db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.id, restaurantId))

	if (!restaurant) throw new NotFoundError('Restaurant not found')

	return reply.status(200).send(restaurant)
}
