import { faker } from '@faker-js/faker'
import { db, productsTable } from '@rangoo/database'
import { makeProductCategory } from '@rangoo/database/src/tests/factories/make-product-category'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('POST /menu/:restaurantId', () => {
	it('should create a new menu item and return status 201', async () => {
		const restaurant = await makeRestaurant()
		const category = await makeProductCategory()

		const requestBody = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			isAvailable: true,
			isVegetarian: false,
			priceInCents: 1500,
			discountPriceInCents: 0,
			categoryId: category.id,
		}

		const response = await app.inject({
			method: 'POST',
			url: `/menu/${restaurant.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(201)

		const responseData = response.json()
		expect(responseData).toHaveProperty('itemId')

		const savedProducts = await db.select().from(productsTable)
		expect(savedProducts).toHaveLength(1)
		expect(savedProducts[0].name).toBe(requestBody.name)
		expect(savedProducts[0].priceInCents).toBe(requestBody.priceInCents)
		expect(savedProducts[0].categoryId).toBe(requestBody.categoryId)
		expect(savedProducts[0].restaurantId).toBe(restaurant.id)
	})

	it('should return 404 if restaurant does not exist', async () => {
		const fakeRestaurantId = faker.string.uuid()
		const category = await makeProductCategory()

		const requestBody = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			isAvailable: true,
			isVegetarian: false,
			priceInCents: 1500,
			discountPriceInCents: 0,
			categoryId: category.id,
		}

		const response = await app.inject({
			method: 'POST',
			url: `/menu/${fakeRestaurantId}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(404)
		const responseData = response.json()
		expect(responseData.message).toBe('Restaurant Not Found')
	})

	it('should return 400 if price is negative', async () => {
		const restaurant = await makeRestaurant()
		const category = await makeProductCategory()

		const requestBody = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			isAvailable: true,
			isVegetarian: false,
			priceInCents: -1500,
			discountPriceInCents: 0,
			categoryId: category.id,
		}

		const response = await app.inject({
			method: 'POST',
			url: `/menu/${restaurant.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(400)
	})

	it('should return 400 if discountPrice is negative', async () => {
		const restaurant = await makeRestaurant()
		const category = await makeProductCategory()

		const requestBody = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			isAvailable: true,
			isVegetarian: false,
			priceInCents: 1500,
			discountPriceInCents: -500,
			categoryId: category.id,
		}

		const response = await app.inject({
			method: 'POST',
			url: `/menu/${restaurant.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(400)
	})

	it('should return 400 if categoryId is invalid', async () => {
		const restaurant = await makeRestaurant()

		const requestBody = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			isAvailable: true,
			isVegetarian: false,
			priceInCents: 1500,
			discountPriceInCents: 0,
			categoryId: 'invalid-uuid-string',
		}

		const response = await app.inject({
			method: 'POST',
			url: `/menu/${restaurant.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(400)
	})
})
