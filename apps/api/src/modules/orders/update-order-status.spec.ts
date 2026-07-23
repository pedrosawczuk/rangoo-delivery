import { faker } from '@faker-js/faker'
import { db, ordersTable } from '@rangoo/database'
import { makeOrder } from '@rangoo/database/src/tests/factories/make-order'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('PATCH /restaurants/:restaurantId/orders/:orderId/status', () => {
	it('should update order status and return 204', async () => {
		const order = await makeOrder({ status: 'PENDING_PAYMENT' })

		const response = await app.inject({
			method: 'PATCH',
			url: `/restaurants/${order.restaurantId}/orders/${order.id}/status`,
			payload: { status: 'PREPARING' },
		})

		expect(response.statusCode).toBe(204)

		const [updatedOrder] = await db
			.select()
			.from(ordersTable)
			.where(eq(ordersTable.id, order.id))

		expect(updatedOrder.status).toBe('PREPARING')
	})

	it('should return 404 if trying to update an order from another restaurant', async () => {
		const order = await makeOrder({ status: 'PENDING_PAYMENT' })
		const maliciousRestaurant = await makeRestaurant()

		const response = await app.inject({
			method: 'PATCH',
			url: `/restaurants/${maliciousRestaurant.id}/orders/${order.id}/status`,
			payload: { status: 'PREPARING' },
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 404 if order does not exist', async () => {
		const restaurant = await makeRestaurant()

		const response = await app.inject({
			method: 'PATCH',
			url: `/restaurants/${restaurant.id}/orders/${faker.string.uuid()}/status`,
			payload: { status: 'PREPARING' },
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 400 if status is invalid', async () => {
		const order = await makeOrder()

		const response = await app.inject({
			method: 'PATCH',
			url: `/restaurants/${order.restaurantId}/orders/${order.id}/status`,
			payload: { status: 'INVALID_STATUS' },
		})

		expect(response.statusCode).toBe(400)
	})
})
