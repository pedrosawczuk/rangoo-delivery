import { db, eq, restaurantTable } from '@rangoo/database'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ListRestaurantByOwnerSchema } from './list-restaurant-by-owner-schema'

export async function listRestaurantByOwnerModule(
	request: FastifyRequest<{ Params: ListRestaurantByOwnerSchema }>,
	reply: FastifyReply,
) {
	const { ownerId } = request.params

	const restaurants = db
		.select()
		.from(restaurantTable)
		.where(eq(restaurantTable.ownerId, ownerId))

	return reply.status(200).send({ data: restaurants })
}
