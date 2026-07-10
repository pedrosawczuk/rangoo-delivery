import { db, eq, restaurantCategoriesTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../../core/errors'
import type { CategoryIdSchema } from '../../../utils/schemas/category-id-schema'

export async function getRestaurantCategoryModule(
	request: FastifyRequest<{ Params: CategoryIdSchema }>,
	reply: FastifyReply,
) {
	const { categoryId } = request.params

	const [category] = await db
		.select()
		.from(restaurantCategoriesTable)
		.where(eq(restaurantCategoriesTable.id, categoryId))

	if (!category) throw new NotFoundError('Category not found')

	return reply.status(200).send(category)
}
