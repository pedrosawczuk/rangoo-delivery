import { faker } from '@faker-js/faker'
import { makeOrder } from '@rangoo/database/src/tests/factories/make-order'
import { makeOrderItem } from '@rangoo/database/src/tests/factories/make-order-item'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('GET /restaurants/:restaurantId/orders', () => {
	it('should return 200, paginate results, and inject order items', async () => {
		const restaurant = await makeRestaurant()

		const orders = await Promise.all(
			Array.from({ length: 3 }).map(() =>
				makeOrder({ restaurantId: restaurant.id }),
			),
		)

		const orderItem1 = await makeOrderItem({ orderId: orders[0].id })
		const orderItem2 = await makeOrderItem({ orderId: orders[0].id })

		const response = await app.inject({
			method: 'GET',
			url: `/restaurants/${restaurant.id}/orders?page=1&limit=2`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(3)
		expect(responseData.meta.totalPages).toBe(2)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(2)

		const returnedOrderWithItems = responseData.data.find(
			(o: { id: string }) => o.id === orders[0].id,
		)

		if (returnedOrderWithItems) {
			expect(returnedOrderWithItems.items).toBeDefined()
			expect(returnedOrderWithItems.items).toHaveLength(2)
			expect(returnedOrderWithItems.items).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ id: orderItem1.id }),
					expect.objectContaining({ id: orderItem2.id }),
				]),
			)
		}
	})

	it('should filter by status correctly', async () => {
		const restaurant = await makeRestaurant()

		await makeOrder({ restaurantId: restaurant.id, status: 'PREPARING' })
		await makeOrder({ restaurantId: restaurant.id, status: 'DELIVERED' })
		await makeOrder({ restaurantId: restaurant.id, status: 'PREPARING' })

		const response = await app.inject({
			method: 'GET',
			url: `/restaurants/${restaurant.id}/orders?status=PREPARING&page=1&limit=10`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(2)

		responseData.data.forEach((order: { status: string }) => {
			expect(order.status).toBe('PREPARING')
		})
	})

	it('should return empty data array if restaurant has no orders', async () => {
		const restaurant = await makeRestaurant()

		const response = await app.inject({
			method: 'GET',
			url: `/restaurants/${restaurant.id}/orders?page=1&limit=10`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(0)
		expect(responseData.meta.totalCount).toBe(0)
	})

	it('should return 404 if restaurant does not exist', async () => {
		const response = await app.inject({
			method: 'GET',
			url: `/restaurants/${faker.string.uuid()}/orders?page=1&limit=10`,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 400 if status query parameter is invalid', async () => {
		const restaurant = await makeRestaurant()

		const response = await app.inject({
			method: 'GET',
			url: `/restaurants/${restaurant.id}/orders?status=INVALID_STATUS`,
		})

		expect(response.statusCode).toBe(400)
	})
})
