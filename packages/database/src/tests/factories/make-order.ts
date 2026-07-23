import { faker } from '@faker-js/faker'
import { db, ordersTable } from '../../index'
import { makeRestaurant } from './make-restaurant'
import { makeUser } from './make-user'

export async function makeOrder(
	override: Partial<typeof ordersTable.$inferInsert> = {},
) {
	let restaurantId = override.restaurantId
	if (!restaurantId) {
		const restaurant = await makeRestaurant()
		restaurantId = restaurant.id
	}

	let userId = override.userId
	if (!userId) {
		const user = await makeUser()
		userId = user.id
	}

	const orderData = {
		restaurantId,
		userId,
		status: faker.helpers.arrayElement([
			'PENDING_PAYMENT',
			'PREPARING',
			'OUT_FOR_DELIVERY',
			'DELIVERED',
			'CANCELED',
		] as const),
		deliveryMethod: faker.helpers.arrayElement(['DELIVERY', 'PICKUP'] as const),
		totalPriceInCents: faker.number.int({ min: 1000, max: 99999 }),
		...override,
	}

	const [order] = await db
		.insert(ordersTable)
		.values(orderData)
		.returning()

	return order
}
