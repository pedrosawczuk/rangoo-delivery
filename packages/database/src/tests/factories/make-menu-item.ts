import { faker } from '@faker-js/faker'
import { db, productsTable } from '../../index'
import { makeProductCategory } from './make-product-category'
import { makeRestaurant } from './make-restaurant'

export async function makeMenuItem(
	override: Partial<typeof productsTable.$inferInsert> = {},
) {
	let restaurantId = override.restaurantId
	if (!restaurantId) {
		const restaurant = await makeRestaurant()
		restaurantId = restaurant.id
	}

	let categoryId = override.categoryId
	if (!categoryId) {
		const category = await makeProductCategory()
		categoryId = category.id
	}

	const menuItemData = {
		name: faker.food.dish(),
		description: faker.food.description(),
		isAvailable: faker.datatype.boolean(),
		isVegetarian: faker.datatype.boolean(),
		priceInCents: faker.number.int({ min: 1000, max: 99999 }),
		discountPriceInCents: 0,
		restaurantId,
		categoryId,
		...override,
	}

	const [menuItem] = await db
		.insert(productsTable)
		.values(menuItemData)
		.returning()

	return menuItem
}
