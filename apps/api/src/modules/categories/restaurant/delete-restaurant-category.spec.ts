import { faker } from '@faker-js/faker'
import {
	db,
	restaurantCategoriesTable,
	restaurantTable,
} from '@rangoo/database'
import { makeRestaurantCategory } from '@rangoo/database/src/tests/factories/make-restaurant-category'
import { describe, expect, test } from 'vitest'
import { app } from '@/app'

describe('DELETE /categories/restaurant/:categoryId', () => {
	test('should delete a category and return status 204', async () => {
		const createdCategory = await makeRestaurantCategory()

		const response = await app.inject({
			method: 'DELETE',
			url: `/categories/restaurant/${createdCategory.id}`,
		})

		expect(response.statusCode).toBe(204)

		const savedCategories = await db.select().from(restaurantCategoriesTable)
		expect(savedCategories).toHaveLength(0)
	})

	test('should return 404 if category does not exist', async () => {
		const fakeId = faker.string.uuid()

		const response = await app.inject({
			method: 'DELETE',
			url: `/categories/restaurant/${fakeId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Category not found')
	})

	test('should return 400 if categoryId is not a valid UUID', async () => {
		const invalidId = '123-invalid-id'

		const response = await app.inject({
			method: 'DELETE',
			url: `/categories/restaurant/${invalidId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
