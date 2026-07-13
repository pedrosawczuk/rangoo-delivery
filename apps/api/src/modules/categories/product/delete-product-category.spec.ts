import { faker } from '@faker-js/faker'
import { db, productCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../../app'

describe('DELETE /categories/product/:categoryId', () => {
	beforeEach(async () => {
		await db.delete(productCategoriesTable)
	})

	test('should delete a category and return status 204', async () => {
		const [createdCategory] = await db
			.insert(productCategoriesTable)
			.values({
				name: faker.commerce.department(),
				slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
			})
			.returning({ id: productCategoriesTable.id })

		const response = await app.inject({
			method: 'DELETE',
			url: `/categories/product/${createdCategory.id}`,
		})

		if (response.statusCode !== 204) {
			console.error(`Debug Error: ${response.json()}`)
		}

		expect(response.statusCode).toBe(204)
		// 204 No Content não tem corpo no response.json()

		const savedCategories = await db.select().from(productCategoriesTable)
		expect(savedCategories).toHaveLength(0)
	})

	test('should return 404 if category does not exist', async () => {
		const fakeId = faker.string.uuid()

		const response = await app.inject({
			method: 'DELETE',
			url: `/categories/product/${fakeId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Category not found')
	})

	test('should return 400 if categoryId is not a valid UUID', async () => {
		const invalidId = '123-invalid-id'

		const response = await app.inject({
			method: 'DELETE',
			url: `/categories/product/${invalidId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
