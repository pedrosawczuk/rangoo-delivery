import { faker } from '@faker-js/faker'
import { makeMenuItem } from '@rangoo/database/src/tests/factories/make-menu-item'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('GET /menu/:restaurantId/:itemId', () => {
	it('should return 200 and the menu item data', async () => {
		const restaurant = await makeRestaurant()
		const item = await makeMenuItem({ restaurantId: restaurant.id })

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${restaurant.id}/${item.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data.id).toBe(item.id)
		expect(responseData.data.name).toBe(item.name)
		expect(responseData.data.restaurantId).toBe(restaurant.id)
	})

	it('should return 404 if restaurant does not exist', async () => {
		const fakeRestaurantId = faker.string.uuid()
		const fakeItemId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${fakeRestaurantId}/${fakeItemId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Restaurant Not Found')
	})

	it('should return 404 if menu item belongs to another restaurant', async () => {
		const restaurantA = await makeRestaurant()
		const restaurantB = await makeRestaurant()

		const itemFromRestaurantB = await makeMenuItem({
			restaurantId: restaurantB.id,
		})

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${restaurantA.id}/${itemFromRestaurantB.id}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Item Not Found')
	})

	it('should return 404 if menu item does not exist', async () => {
		const restaurant = await makeRestaurant()
		const fakeItemId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/menu/${restaurant.id}/${fakeItemId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Item Not Found')
	})

	it('should return 400 if IDs are invalid', async () => {
		const response = await app.inject({
			method: 'GET',
			url: `/menu/invalid-restaurant-id/invalid-item-id`,
		})

		expect(response.statusCode).toBe(400)
	})
})
