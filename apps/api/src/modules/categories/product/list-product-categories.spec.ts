import { faker } from '@faker-js/faker'
import { db, productCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../../app'

describe('GET /categories/product', () => {
	beforeEach(async () => {
		await db.delete(productCategoriesTable)
	})

	test('should return 200 with empty list if no categories exist', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/categories/product',
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(0)
		expect(responseData.meta.totalCount).toBe(0)
	})

	test('should return 200 with a list of categories (default pagination)', async () => {
		const dataToInsert = [
			{
				name: faker.commerce.department(),
				slug: faker.string.uuid(),
			},
			{
				name: faker.commerce.department(),
				slug: faker.string.uuid(),
			},
		]

		await db.insert(productCategoriesTable).values(dataToInsert)

		const response = await app.inject({
			method: 'GET',
			url: '/categories/product',
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(2)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(10)
	})

	test('should return 200 and respect pagination params', async () => {
		// Inserindo 5 categorias no banco
		const dataToInsert = Array.from({ length: 5 }).map(() => ({
			name: faker.commerce.department(),
			slug: faker.string.uuid(),
		}))

		await db.insert(productCategoriesTable).values(dataToInsert)

		// Pedindo a página 1, limitando a 2 itens
		const response = await app.inject({
			method: 'GET',
			url: '/categories/product?page=1&limit=2',
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		
		// O array retornado deve ser cortado (limit: 2)
		expect(responseData.data).toHaveLength(2)

		// A matemática da paginação deve refletir o total
		expect(responseData.meta.totalCount).toBe(5)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(2)
		expect(responseData.meta.totalPages).toBe(3) // Math.ceil(5/2) = 3
	})
})
