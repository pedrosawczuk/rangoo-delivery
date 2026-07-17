import {
	and,
	db,
	eq,
	restaurantMembersTable,
	restaurantTable,
	usersTable,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { RestaurantIdSchema } from '../../utils/schemas/restaurant-id-schema'
import type { UserIdSchema } from '../../utils/schemas/user-id-schema'

export async function getRestaurantMemberModule(
	request: FastifyRequest<{ Params: RestaurantIdSchema & UserIdSchema }>,
	reply: FastifyReply,
) {
	const { restaurantId, userId } = request.params

	const [user, restaurant] = await Promise.all([
		db.select().from(usersTable).where(eq(usersTable.id, userId)),
		db
			.select()
			.from(restaurantTable)
			.where(eq(restaurantTable.id, restaurantId)),
	])

	if (!user) throw new NotFoundError('User not Found')
	if (!restaurant) throw new NotFoundError('Restaurant not Found')

	const [restaurantMember] = await db
		.select()
		.from(restaurantMembersTable)
		.where(
			and(
				eq(restaurantMembersTable.restaurantId, restaurantId),
				eq(restaurantMembersTable.userId, userId),
			),
		)
		.limit(1)

	if (!restaurantMember) throw new NotFoundError('User dont restaurant member')

	return reply.status(200).send({ data: restaurantMember })
}
