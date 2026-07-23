import { faker } from '@faker-js/faker'
import { makeMenuItem } from '@rangoo/database/src/tests/factories/make-menu-item'
import { makeOrder } from '@rangoo/database/src/tests/factories/make-order'
import { makeOrderItem } from '@rangoo/database/src/tests/factories/make-order-item'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserAddress } from '@rangoo/database/src/tests/factories/make-user-address'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('GET /users/:userId/orders/:orderId', () => {
	it('should return order details including items and delivery address', async () => {
		const user = await makeUser()
		const address = await makeUserAddress({ userId: user.id })
		const order = await makeOrder({
			userId: user.id,
			deliveryMethod: 'DELIVERY',
			deliveryAddressId: address.id,
		})

		const product = await makeMenuItem()
		const orderItem = await makeOrderItem({
			orderId: order.id,
			productId: product.id,
		})

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/orders/${order.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.order.id).toBe(order.id)

		expect(responseData.items).toBeDefined()
		expect(responseData.items).toHaveLength(1)
		expect(responseData.items[0].id).toBe(orderItem.id)
		expect(responseData.items[0].productId).toBe(product.id)
		expect(responseData.items[0].productName).toBe(product.name)

		expect(responseData.deliveryAddress).toBeDefined()
		expect(responseData.deliveryAddress.id).toBe(address.id)
	})

	it('should return order details without delivery address for PICKUP orders', async () => {
		const user = await makeUser()
		const order = await makeOrder({
			userId: user.id,
			deliveryMethod: 'PICKUP',
			deliveryAddressId: null,
		})

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/orders/${order.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.order.id).toBe(order.id)
		expect(responseData.deliveryAddress).toBeNull()
	})

	it('should return 404 if trying to access an order from another user', async () => {
		const maliciousUser = await makeUser()

		const victimUser = await makeUser()
		const order = await makeOrder({ userId: victimUser.id })

		const response = await app.inject({
			method: 'GET',
			url: `/users/${maliciousUser.id}/orders/${order.id}`,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 404 if order does not exist', async () => {
		const user = await makeUser()

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/orders/${faker.string.uuid()}`,
		})

		expect(response.statusCode).toBe(404)
	})
})
