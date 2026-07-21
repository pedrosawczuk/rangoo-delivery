import { and, db, eq, not, productCategoriesTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ConflictError, NotFoundError } from '@/core/errors'
import { generateSlug } from '@/utils/formatters'
import type { CategoryIdSchema } from '@/utils/schemas/category-id-schema'
import type { CreateCategorySchema } from '@/utils/schemas/create-category-schema'

export async function updateProductCategoryModule(
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
		.from(productCategoriesTable)
		.where(
			and(
				eq(productCategoriesTable.slug, slugNormalize),
				not(eq(productCategoriesTable.id, categoryId)),
			),
		)

	if (slugExists)
		throw new ConflictError('Slug already exists for another category')

	const [updatedCategory] = await db
		.update(productCategoriesTable)
		.set({ name, slug: slugNormalize })
		.where(eq(productCategoriesTable.id, categoryId))
		.returning()

	if (!updatedCategory) throw new NotFoundError('Category not found')

	return reply.status(200).send(updatedCategory)
}
