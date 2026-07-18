import {
	and,
	db,
	eq,
	restaurantMembersTable,
	restaurantTable,
	usersTable,
} from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { RestaurantIdSchema } from '@/utils/schemas/restaurant-id-schema'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'
import type { UpdateRestaurantMemberSchema } from './update-restaurant-member-schema'

export async function updateRestaurantMemberModule(
	request: FastifyRequest<{
		Params: RestaurantIdSchema & UserIdSchema
		Body: UpdateRestaurantMemberSchema
	}>,
	reply: FastifyReply,
) {
	const { restaurantId, userId } = request.params
	const { role } = request.body

	const [user, restaurant] = await Promise.all([
		db.select().from(usersTable).where(eq(usersTable.id, userId)),
		db
			.select()
			.from(restaurantTable)
			.where(eq(restaurantTable.id, restaurantId)),
	])

	if (!user) throw new NotFoundError('User not Found')
	if (!restaurant) throw new NotFoundError('Restaurant not Found')

	const [updatedRestaurantMember] = await db
		.update(restaurantMembersTable)
		.set({ role })
		.where(
			and(
				eq(restaurantMembersTable.userId, userId),
				eq(restaurantMembersTable.restaurantId, restaurantId),
			),
		)
		.returning()

	return reply.status(200).send({ data: updatedRestaurantMember })
}
