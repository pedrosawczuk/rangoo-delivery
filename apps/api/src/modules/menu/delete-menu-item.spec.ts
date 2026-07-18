import { faker } from '@faker-js/faker'
import { db, productsTable } from '@rangoo/database'
import { makeMenuItem } from '@rangoo/database/src/tests/factories/make-menu-item'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('DELETE /menu/:restaurantId/:itemId', () => {
	it('should delete a menu item and return status 204', async () => {
		const restaurant = await makeRestaurant()
		const item = await makeMenuItem({ restaurantId: restaurant.id })

		const response = await app.inject({
			method: 'DELETE',
			url: `/menu/${restaurant.id}/${item.id}`,
		})

		expect(response.statusCode).toBe(204)

		const savedProducts = await db.select().from(productsTable)
		expect(savedProducts).toHaveLength(0)
	})

	it('should return 404 if menu item belongs to another restaurant', async () => {
		const restaurantA = await makeRestaurant()
		const restaurantB = await makeRestaurant()

		const itemFromRestaurantB = await makeMenuItem({
			restaurantId: restaurantB.id,
		})

		const response = await app.inject({
			method: 'DELETE',
			url: `/menu/${restaurantA.id}/${itemFromRestaurantB.id}`,
		})

		expect(response.statusCode).toBe(404)
		const responseData = response.json()
		expect(responseData.message).toBe('Menu item not found')

		const savedProducts = await db.select().from(productsTable)
		expect(savedProducts).toHaveLength(1)
		expect(savedProducts[0].id).toBe(itemFromRestaurantB.id)
	})

	it('should return 404 if menu item does not exist', async () => {
		const restaurant = await makeRestaurant()
		const fakeItemId = faker.string.uuid()

		const response = await app.inject({
			method: 'DELETE',
			url: `/menu/${restaurant.id}/${fakeItemId}`,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 400 if restaurantId is invalid', async () => {
		const fakeItemId = faker.string.uuid()

		const response = await app.inject({
			method: 'DELETE',
			url: `/menu/invalid-uuid/${fakeItemId}`,
		})

		expect(response.statusCode).toBe(400)
	})

	it('should return 400 if itemId is invalid', async () => {
		const restaurant = await makeRestaurant()

		const response = await app.inject({
			method: 'DELETE',
			url: `/menu/${restaurant.id}/invalid-uuid`,
		})

		expect(response.statusCode).toBe(400)
	})
})
