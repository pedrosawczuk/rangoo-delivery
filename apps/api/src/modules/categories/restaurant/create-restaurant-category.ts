import { db, eq, restaurantCategoriesTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ConflictError } from '@/core/errors'
import { generateSlug } from '@/utils/formatters'
import type { CreateCategorySchema } from '@/utils/schemas/create-category-schema'

export async function createRestaurantCategoryModule(
	request: FastifyRequest<{ Body: CreateCategorySchema }>,
	reply: FastifyReply,
) {
	const { name } = request.body

	const slugNormalize = generateSlug(name)

	const [slugExists] = await db
		.select()
		.from(restaurantCategoriesTable)
		.where(eq(restaurantCategoriesTable.slug, slugNormalize))

	if (slugExists) throw new ConflictError('Slug already exists')

	const [newRestaurantCategory] = await db
		.insert(restaurantCategoriesTable)
		.values({
			name,
			slug: slugNormalize,
		})
		.returning({ id: restaurantCategoriesTable.id })

	return reply.status(201).send({ id: newRestaurantCategory.id })
}
