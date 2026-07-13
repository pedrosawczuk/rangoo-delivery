import { faker } from '@faker-js/faker'
import { db, restaurantCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../../app'

describe('DELETE /categories/restaurant/:categoryId', () => {
	beforeEach(async () => {
		await db.delete(restaurantCategoriesTable)
	})

	test('should delete a category and return status 204', async () => {
		const [createdCategory] = await db
			.insert(restaurantCategoriesTable)
			.values({
				name: faker.company.name(),
				slug: faker.helpers.slugify(faker.company.name()).toLowerCase(),
			})
			.returning({ id: restaurantCategoriesTable.id })

		const response = await app.inject({
			method: 'DELETE',
			url: `/categories/restaurant/${createdCategory.id}`,
		})

		if (response.statusCode !== 204) {
			console.error(`Debug Error: ${response.json()}`)
		}

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
