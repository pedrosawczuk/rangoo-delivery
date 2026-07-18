import { db, eq, restaurantCategoriesTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { CategoryIdSchema } from '@/utils/schemas/category-id-schema'

export async function deleteRestaurantCategoryModule(
	request: FastifyRequest<{ Params: CategoryIdSchema }>,
	reply: FastifyReply,
) {
	const { categoryId } = request.params

	const [deletedCategory] = await db
		.delete(restaurantCategoriesTable)
		.where(eq(restaurantCategoriesTable.id, categoryId))
		.returning({ id: restaurantCategoriesTable.id })

	if (!deletedCategory) throw new NotFoundError('Category not found')

	return reply.status(204).send()
}
