import { db, restaurantTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateNewRestaurantSchema } from './create-new-restaurant-schema'

export async function createNewRestaurantModule(
	request: FastifyRequest<{ Body: CreateNewRestaurantSchema }>,
	reply: FastifyReply,
) {
	const {
		city,
		complement,
		description,
		categoryId,
		name,
		neighborhood,
		ownerId,
		phone,
		state,
		street,
		streetNumber,
		zipCode,
		document,
	} = request.body

	const [newRestaurant] = await db
		.insert(restaurantTable)
		.values({
			city,
			description,
			name,
			phone,
			state,
			street,
			streetNumber,
			zipCode,
			complement,
			categoryId,
			ownerId,
			neighborhood,
			document,
		})
		.returning({ id: restaurantTable.id })

	return reply.status(201).send({ restaurantId: newRestaurant.id })
}
