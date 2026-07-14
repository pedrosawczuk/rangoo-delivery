import { faker } from '@faker-js/faker'
import { db, restaurantTable } from '../../index'
import { makeRestaurantCategory } from './make-restaurant-category'
import { makeUser } from './make-user'

export async function makeRestaurant(
	override: Partial<typeof restaurantTable.$inferInsert> = {},
) {
	let ownerId = override.ownerId
	if (!ownerId) {
		const user = await makeUser()
		ownerId = user.id
	}

	let categoryId = override.categoryId
	if (!categoryId) {
		const category = await makeRestaurantCategory()
		categoryId = category.id
	}

	const restaurantData = {
		name: faker.company.name(),
		phone: faker.phone.number(),
		description: faker.lorem.paragraph(),
		document: faker.string.numeric(14),
		street: faker.location.street(),
		streetNumber: faker.location.buildingNumber(),
		complement: faker.location.secondaryAddress(),
		neighborhood: faker.location.county(),
		city: faker.location.city(),
		state: faker.location.state({ abbreviated: true }),
		zipCode: faker.location.zipCode(),
		ownerId,
		categoryId,
		...override,
	}

	const [restaurant] = await db
		.insert(restaurantTable)
		.values(restaurantData)
		.returning()

	return restaurant
}
