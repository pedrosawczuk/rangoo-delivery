import { db, eq, productCategoriesTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { CategoryIdSchema } from '@/utils/schemas/category-id-schema'

export async function deleteProductCategoryModule(
	request: FastifyRequest<{ Params: CategoryIdSchema }>,
	reply: FastifyReply,
) {
	const { categoryId } = request.params

	const [deletedCategory] = await db
		.delete(productCategoriesTable)
		.where(eq(productCategoriesTable.id, categoryId))
		.returning({ id: productCategoriesTable.id })

	if (!deletedCategory) throw new NotFoundError('Category not found')

	return reply.status(204).send()
}
