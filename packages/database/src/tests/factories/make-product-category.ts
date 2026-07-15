import { faker } from '@faker-js/faker'
import { db, productCategoriesTable } from '../../index'

export async function makeProductCategory(
	override: Partial<typeof productCategoriesTable.$inferInsert> = {},
) {
	const name = override.name || faker.commerce.department()
	const slug = override.slug || faker.helpers.slugify(name).toLowerCase()

	const categoryData = {
		name,
		slug,
		...override,
	}

	const [category] = await db
		.insert(productCategoriesTable)
		.values(categoryData)
		.returning()

	return category
}
