import { faker } from '@faker-js/faker'
import { db, productsTable } from '@rangoo/database'
import { makeMenuItem } from '@rangoo/database/src/tests/factories/make-menu-item'
import { makeProductCategory } from '@rangoo/database/src/tests/factories/make-product-category'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('PUT /menu/:restaurantId/:itemId', () => {
	it('should update all fields of a menu item and return 200', async () => {
		const restaurant = await makeRestaurant()
		const oldCategory = await makeProductCategory()
		const newCategory = await makeProductCategory()

		const item = await makeMenuItem({
			restaurantId: restaurant.id,
			categoryId: oldCategory.id,
		})

		const requestBody = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			isAvailable: false,
			isVegetarian: true,
			priceInCents: 9999,
			discountPriceInCents: 100,
			categoryId: newCategory.id,
		}

		const response = await app.inject({
			method: 'PUT',
			url: `/menu/${restaurant.id}/${item.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(200)

		const [updatedItem] = await db
			.select()
			.from(productsTable)
			.where(eq(productsTable.id, item.id))

		expect(updatedItem.name).toBe(requestBody.name)
		expect(updatedItem.description).toBe(requestBody.description)
		expect(updatedItem.isAvailable).toBe(requestBody.isAvailable)
		expect(updatedItem.isVegetarian).toBe(requestBody.isVegetarian)
		expect(updatedItem.priceInCents).toBe(requestBody.priceInCents)
		expect(updatedItem.discountPriceInCents).toBe(requestBody.discountPriceInCents)
		expect(updatedItem.categoryId).toBe(requestBody.categoryId)
	})

	it('should partially update a menu item and return 200', async () => {
		const restaurant = await makeRestaurant()
		const category = await makeProductCategory()

		const item = await makeMenuItem({
			restaurantId: restaurant.id,
			categoryId: category.id,
		})

		const requestBody = {
			priceInCents: 9999,
		}

		const response = await app.inject({
			method: 'PUT',
			url: `/menu/${restaurant.id}/${item.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(200)

		const [updatedItem] = await db
			.select()
			.from(productsTable)
			.where(eq(productsTable.id, item.id))

		expect(updatedItem.priceInCents).toBe(requestBody.priceInCents)
		expect(updatedItem.name).toBe(item.name)
		expect(updatedItem.description).toBe(item.description)
		expect(updatedItem.categoryId).toBe(item.categoryId)
	})

	it('should return 404 if trying to update an item from another restaurant', async () => {
		const restaurantA = await makeRestaurant()
		const restaurantB = await makeRestaurant()
		
		const itemFromRestaurantB = await makeMenuItem({ restaurantId: restaurantB.id })

		const requestBody = { priceInCents: 100 }

		const response = await app.inject({
			method: 'PUT',
			url: `/menu/${restaurantA.id}/${itemFromRestaurantB.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 400 if priceInCents is negative', async () => {
		const restaurant = await makeRestaurant()
		const item = await makeMenuItem({ restaurantId: restaurant.id })

		const requestBody = { priceInCents: -1500 }

		const response = await app.inject({
			method: 'PUT',
			url: `/menu/${restaurant.id}/${item.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(400)
	})

	it('should return 400 if categoryId is invalid', async () => {
		const restaurant = await makeRestaurant()
		const item = await makeMenuItem({ restaurantId: restaurant.id })

		const requestBody = { categoryId: 'not-a-uuid' }

		const response = await app.inject({
			method: 'PUT',
			url: `/menu/${restaurant.id}/${item.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(400)
	})
})
