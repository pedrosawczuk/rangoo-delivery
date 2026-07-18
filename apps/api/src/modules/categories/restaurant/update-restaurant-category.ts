import { and, db, eq, not, restaurantCategoriesTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ConflictError, NotFoundError } from '@/core/errors'
import { generateSlug } from '@/utils/formatters'
import type { CategoryIdSchema } from '@/utils/schemas/category-id-schema'
import type { CreateCategorySchema } from '@/utils/schemas/create-category-schema'

export async function updateRestaurantCategoryModule(
	request: FastifyRequest<{
		Params: CategoryIdSchema
		Body: CreateCategorySchema
	}>,
	reply: FastifyReply,
) {
	const { categoryId } = request.params
	const { name } = request.body

	const slugNormalize = generateSlug(name)

	const [slugExists] = await db
		.select()
		.from(restaurantCategoriesTable)
		.where(
			and(
				eq(restaurantCategoriesTable.slug, slugNormalize),
				not(eq(restaurantCategoriesTable.id, categoryId)),
			),
		)

	if (slugExists)
		throw new ConflictError('Slug already exists for another category')

	const [updatedCategory] = await db
		.update(restaurantCategoriesTable)
		.set({ name, slug: slugNormalize })
		.where(eq(restaurantCategoriesTable.id, categoryId))
		.returning()

	if (!updatedCategory) throw new NotFoundError('Category not found')

	return reply.status(200).send(updatedCategory)
}
