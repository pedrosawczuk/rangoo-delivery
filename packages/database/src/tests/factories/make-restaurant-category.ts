import { faker } from '@faker-js/faker'
import { db, restaurantCategoriesTable } from '../../index'

export async function makeRestaurantCategory(
	override: Partial<typeof restaurantCategoriesTable.$inferInsert> = {},
) {
	const name =
		override.name ||
		faker.commerce.department() +
			Math.floor(Math.random() * (99999 - 1111 + 1)) +
			1111 // Gambiarra para não permanecer erro de Slug already exists
	const slug = override.slug || faker.helpers.slugify(name).toLowerCase()

	const categoryData = {
		name,
		slug,
		...override,
	}

	const [category] = await db
		.insert(restaurantCategoriesTable)
		.values(categoryData)
		.returning()

	return category
}
