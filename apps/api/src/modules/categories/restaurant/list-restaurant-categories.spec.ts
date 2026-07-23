import { makeRestaurantCategory } from '@rangoo/database/src/tests/factories/make-restaurant-category'
import { describe, expect, test } from 'vitest'
import { app } from '@/app'

describe('GET /categories/restaurant', () => {
	test('should return 200 with empty list if no categories exist', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/categories/restaurant',
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(0)
		expect(responseData.meta.totalCount).toBe(0)
	})

	test('should return 200 with a list of categories (default pagination)', async () => {
		await Promise.all([makeRestaurantCategory(), makeRestaurantCategory()])

		const response = await app.inject({
			method: 'GET',
			url: '/categories/restaurant',
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(2)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(10)
	})

	test('should return 200 and respect pagination params', async () => {
		await Promise.all(
			Array.from({ length: 5 }).map(() => makeRestaurantCategory()),
		)

		const response = await app.inject({
			method: 'GET',
			url: '/categories/restaurant?page=1&limit=2',
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()

		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(5)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(2)
		expect(responseData.meta.totalPages).toBe(3)
	})
})
