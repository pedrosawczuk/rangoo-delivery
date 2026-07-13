import { faker } from '@faker-js/faker'
import { db, restaurantCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../../app'

describe('PUT /categories/restaurant/:categoryId', () => {
	beforeEach(async () => {
		await db.delete(restaurantCategoriesTable)
	})

	test('should update a category and return status 200', async () => {
		const [createdCategory] = await db
			.insert(restaurantCategoriesTable)
			.values({
				name: faker.company.name(),
				slug: faker.helpers.slugify(faker.company.name()).toLowerCase(),
			})
			.returning()

		const newName = 'Pizzaria e Hamburgueria'
		const expectedName = 'Pizzaria E Hamburgueria'

		const response = await app.inject({
			method: 'PUT',
			url: `/categories/restaurant/${createdCategory.id}`,
			payload: { name: newName },
		})

		if (response.statusCode !== 200) {
			console.error(`Debug Error: ${response.json()}`)
		}

		expect(response.statusCode).toBe(200)
		const responseData = response.json()
		expect(responseData.name).toBe(expectedName)
		expect(responseData.slug).toBe('pizzaria-e-hamburgueria')

		const savedCategories = await db.select().from(restaurantCategoriesTable)
		expect(savedCategories).toHaveLength(1)
		expect(savedCategories[0].name).toBe(expectedName)
	})

	test('should return 409 if new slug already exists in another category', async () => {
		const [, categoryB] = await db
			.insert(restaurantCategoriesTable)
			.values([
				{ name: 'Pizzaria', slug: 'pizzaria' },
				{ name: 'Gastro Bar', slug: 'gastro-bar' },
			])
			.returning()

		const response = await app.inject({
			method: 'PUT',
			url: `/categories/restaurant/${categoryB.id}`,
			payload: { name: 'Pizzaria' },
		})

		expect(response.statusCode).toBe(409)
		const responseData = response.json()
		expect(responseData.message).toBe(
			'Slug already exists for another category',
		)
	})

	test('should return 404 if category does not exist', async () => {
		const fakeId = faker.string.uuid()

		const response = await app.inject({
			method: 'PUT',
			url: `/categories/restaurant/${fakeId}`,
			payload: { name: 'Pizzaria' },
		})

		expect(response.statusCode).toBe(404)
		const responseData = response.json()
		expect(responseData.message).toBe('Category not found')
	})

	test('should return 400 if categoryId is not a valid UUID', async () => {
		const invalidId = '123-invalid-id'

		const response = await app.inject({
			method: 'PUT',
			url: `/categories/restaurant/${invalidId}`,
			payload: { name: 'Pizzaria' },
		})

		expect(response.statusCode).toBe(400)
	})
})
