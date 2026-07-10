import { db, eq, productCategoriesTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ConflictError } from '../../../core/errors'
import { generateSlug } from '../../../utils/formatters'
import type { CreateCategorySchema } from '../../../utils/schemas/create-category-schema'

export async function createProductCategoryModule(
	request: FastifyRequest<{ Body: CreateCategorySchema }>,
	reply: FastifyReply,
) {
	const { name } = request.body

	const slugNormalize = generateSlug(name)

	const [slugExists] = await db
		.select()
		.from(productCategoriesTable)
		.where(eq(productCategoriesTable.slug, slugNormalize))

	if (slugExists) throw new ConflictError('Slug already exists')

	const [newProductCategory] = await db
		.insert(productCategoriesTable)
		.values({
			name,
			slug: slugNormalize,
		})
		.returning({ id: productCategoriesTable.id })

	return reply.status(201).send({ id: newProductCategory.id })
}
