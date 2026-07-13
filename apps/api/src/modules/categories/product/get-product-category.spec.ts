import { faker } from '@faker-js/faker'
import { db, productCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../../app'

describe('GET /categories/product/:categoryId', () => {
	beforeEach(async () => {
		await db.delete(productCategoriesTable)
	})

	test('should return 200 and the category data', async () => {
		const [createdCategory] = await db
			.insert(productCategoriesTable)
			.values({
				name: faker.commerce.department(),
				slug: faker.helpers.slugify(faker.commerce.department()).toLowerCase(),
			})
			.returning({
				id: productCategoriesTable.id,
				name: productCategoriesTable.name,
				slug: productCategoriesTable.slug,
			})

		const response = await app.inject({
			method: 'GET',
			url: `/categories/product/${createdCategory.id}`,
		})

		if (response.statusCode !== 200) {
			console.error(`Debug Error: ${response.json()}`)
		}

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
			url: `/categories/product/${fakeId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Category not found')
	})

	test('should return 400 if categoryId is not a valid UUID', async () => {
		const invalidId = '123-invalid-id'

		const response = await app.inject({
			method: 'GET',
			url: `/categories/product/${invalidId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
