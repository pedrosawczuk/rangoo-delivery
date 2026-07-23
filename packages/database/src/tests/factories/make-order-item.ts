import { faker } from '@faker-js/faker'
import { db, orderItemsTable } from '../../index'
import { makeMenuItem } from './make-menu-item'
import { makeOrder } from './make-order'

export async function makeOrderItem(
	override: Partial<typeof orderItemsTable.$inferInsert> = {},
) {
	let orderId = override.orderId
	if (!orderId) {
		const order = await makeOrder()
		orderId = order.id
	}

	let productId = override.productId
	if (!productId) {
		const product = await makeMenuItem()
		productId = product.id
	}

	const orderItemData = {
		orderId,
		productId,
		quantity: faker.number.int({ min: 1, max: 10 }),
		unitPriceInCents: faker.number.int({ min: 1000, max: 50000 }),
		...override,
	}

	const [orderItem] = await db
		.insert(orderItemsTable)
		.values(orderItemData)
		.returning()

	return orderItem
}
