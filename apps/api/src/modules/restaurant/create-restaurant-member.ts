import {
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
import type { CreateRestaurantMemberSchema } from './create-restaurant-member-schema'

export async function createRestaurantMemberModule(
	request: FastifyRequest<{
		Params: RestaurantIdSchema
		Body: CreateRestaurantMemberSchema & UserIdSchema
	}>,
	reply: FastifyReply,
) {
	const { restaurantId } = request.params
	const { role, userId } = request.body

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
		.insert(restaurantMembersTable)
		.values({
			restaurantId,
			role,
			userId,
		})
		.returning({ id: restaurantMembersTable.id })

	return reply.status(201).send({ id: restaurantMember.id })
}
