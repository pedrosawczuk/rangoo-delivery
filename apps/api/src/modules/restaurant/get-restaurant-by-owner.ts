import { and, db, eq, restaurantTable, usersTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { OwnerIdSchema } from '../../utils/schemas/owner-id-schema'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'

export async function getRestaurantByOwnerModule(
	request: FastifyRequest<{ Params: OwnerIdSchema & RestaurantIdSchema }>,
	reply: FastifyReply,
) {
	const { ownerId, restaurantId } = request.params

	const [userExists] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, ownerId))

	if (!userExists) throw new NotFoundError('User not Found')

	const [restaurantExists] = await db
		.select()
		.from(restaurantTable)
		.where(
			and(
				eq(restaurantTable.id, restaurantId),
				eq(restaurantTable.ownerId, ownerId),
			),
		)

	if (!restaurantExists) throw new NotFoundError('Restaurant Not Exists')

	return reply.status(200).send({ data: restaurantExists })
}
