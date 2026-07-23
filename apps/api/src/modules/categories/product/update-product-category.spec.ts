import { faker } from '@faker-js/faker'
import { db, productCategoriesTable } from '@rangoo/database'
import { makeProductCategory } from '@rangoo/database/src/tests/factories/make-product-category'
import { describe, expect, test } from 'vitest'
import { app } from '@/app'

describe('PUT /categories/product/:categoryId', () => {
	test('should update a category and return status 200', async () => {
		const createdCategory = await makeProductCategory()

		const newName = 'Eletronicos e Tecnologia'
		const expectedName = 'Eletronicos E Tecnologia'

		const response = await app.inject({
			method: 'PUT',
			url: `/categories/product/${createdCategory.id}`,
			payload: { name: newName },
		})

		expect(response.statusCode).toBe(200)
		const responseData = response.json()
		expect(responseData.name).toBe(expectedName)
		expect(responseData.slug).toBe('eletronicos-e-tecnologia')

		const savedCategories = await db.select().from(productCategoriesTable)
		expect(savedCategories).toHaveLength(1)
		expect(savedCategories[0].name).toBe(expectedName)
	})

	test('should return 409 if new slug already exists in another category', async () => {
		await makeProductCategory({ name: 'Lanches', slug: 'lanches' })
		const categoryB = await makeProductCategory({
			name: 'Bebidas',
			slug: 'bebidas',
		})

		const response = await app.inject({
			method: 'PUT',
			url: `/categories/product/${categoryB.id}`,
			payload: { name: 'Lanches' },
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
			url: `/categories/product/${fakeId}`,
			payload: { name: 'Bebidas' },
		})

		expect(response.statusCode).toBe(404)
		const responseData = response.json()
		expect(responseData.message).toBe('Category not found')
	})

	test('should return 400 if categoryId is not a valid UUID', async () => {
		const invalidId = '123-invalid-id'

		const response = await app.inject({
			method: 'PUT',
			url: `/categories/product/${invalidId}`,
			payload: { name: 'Bebidas' },
		})

		expect(response.statusCode).toBe(400)
	})
})
