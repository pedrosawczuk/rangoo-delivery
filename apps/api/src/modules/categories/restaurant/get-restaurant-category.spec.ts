import { faker } from '@faker-js/faker'
import { db, restaurantCategoriesTable } from '@rangoo/database'
import { makeRestaurantCategory } from '@rangoo/database/src/tests/factories/make-restaurant-category'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../../app'

describe('GET /categories/restaurant/:categoryId', () => {
	beforeEach(async () => {
		await db.delete(restaurantCategoriesTable)
	})

	test('should return 200 and the category data', async () => {
		const createdCategory = await makeRestaurantCategory()

		const response = await app.inject({
			method: 'GET',
			url: `/categories/restaurant/${createdCategory.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.id).toBe(createdCategory.id)
		expect(responseData.name).toBe(createdCategory.name)
		expect(responseData.slug).toBe(createdCategory.slug)
	})

	test('should return 404 if category does not exist', async () => {
		const fakeId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/categories/restaurant/${fakeId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Category not found')
	})

	test('should return 400 if categoryId is not a valid UUID', async () => {
		const invalidId = '123-invalid-id'

		const response = await app.inject({
			method: 'GET',
			url: `/categories/restaurant/${invalidId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
