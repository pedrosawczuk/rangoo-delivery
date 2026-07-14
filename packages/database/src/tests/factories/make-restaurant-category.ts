import { faker } from '@faker-js/faker'
import { db, restaurantCategoriesTable } from '../../index'

export async function makeRestaurantCategory(
	override: Partial<typeof restaurantCategoriesTable.$inferInsert> = {},
) {
	const name = override.name || faker.commerce.department()
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
