import { and, db, eq, restaurantTable, usersTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'
import type { UserIdSchema } from '../../utils/schemas/user-id-schema'

export async function getRestaurantByOwnerModule(
	request: FastifyRequest<{ Params: UserIdSchema & RestaurantIdSchema }>,
	reply: FastifyReply,
) {
	const { userId, restaurantId } = request.params

	const [userExists] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userId))

	if (!userExists) throw new NotFoundError('User not Found')

	const [restaurantExists] = await db
		.select()
		.from(restaurantTable)
		.where(
			and(
				eq(restaurantTable.id, restaurantId),
				eq(restaurantTable.ownerId, userId),
			),
		)

	if (!restaurantExists) throw new NotFoundError('Restaurant Not Exists')

	return reply.status(200).send({ data: restaurantExists })
}
