import { faker } from '@faker-js/faker'
import { db, restaurantCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../../app'

describe('POST /categories/restaurant', () => {
	beforeEach(async () => {
		await db.delete(restaurantCategoriesTable)
	})

	test('should create a new restaurant category and return status 201', async () => {
		const requestBody = {
			name: faker.company.name(),
		}

		const response = await app.inject({
			method: 'POST',
			url: '/categories/restaurant',
			payload: requestBody,
		})

		if (response.statusCode !== 201) {
			console.error('Debug: Test failed. API Response Body:', response.json())
		}

		expect(response.statusCode).toBe(201)

		const responseData = response.json()
		expect(responseData).toHaveProperty('id')

		const savedCategories = await db.select().from(restaurantCategoriesTable)

		const expectedName = requestBody.name
			.toLowerCase()
			.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())

		expect(savedCategories).toHaveLength(1)
		expect(savedCategories[0].name).toBe(expectedName)
	})

	test('should return 409 if restaurant category slug already exists', async () => {
		const requestBody = {
			name: faker.company.name(),
		}

		await app.inject({
			method: 'POST',
			url: '/categories/restaurant',
			payload: requestBody,
		})

		const response = await app.inject({
			method: 'POST',
			url: '/categories/restaurant',
			payload: requestBody,
		})

		expect(response.statusCode).toBe(409)

		const responseData = response.json()
		expect(responseData.message).toBe('Slug already exists')
	})
})
