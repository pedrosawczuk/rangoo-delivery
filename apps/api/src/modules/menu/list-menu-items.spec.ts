import { faker } from '@faker-js/faker'
import { makeMenuItem } from '@rangoo/database/src/tests/factories/make-menu-item'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('GET /menu/:restaurantId', () => {
	it('should return 200 with empty list if restaurant has no items', async () => {
		const restaurant = await makeRestaurant()

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${restaurant.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(0)
		expect(responseData.meta.totalCount).toBe(0)
	})

	it('should return 404 if restaurant does not exist', async () => {
		const fakeRestaurantId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${fakeRestaurantId}`,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 200 with items belonging ONLY to the restaurant', async () => {
		const restaurantA = await makeRestaurant()
		const restaurantB = await makeRestaurant()

		await Promise.all([
			makeMenuItem({ restaurantId: restaurantA.id }),
			makeMenuItem({ restaurantId: restaurantA.id }),
			makeMenuItem({ restaurantId: restaurantB.id }),
		])

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${restaurantA.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(2)

		const allBelongToRestaurantA = responseData.data.every(
			(item: any) => item.restaurantId === restaurantA.id,
		)
		expect(allBelongToRestaurantA).toBe(true)
	})

	it('should return 200 and respect pagination params', async () => {
		const restaurant = await makeRestaurant()

		await Promise.all(
			Array.from({ length: 5 }).map(() =>
				makeMenuItem({ restaurantId: restaurant.id }),
			),
		)

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${restaurant.id}?page=1&limit=2`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(5)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(2)
		expect(responseData.meta.totalPages).toBe(3)
	})

	it('should return 400 if restaurantId is invalid', async () => {
		const response = await app.inject({
			method: 'GET',
			url: `/menu/invalid-uuid`,
		})

		expect(response.statusCode).toBe(400)
	})
})
