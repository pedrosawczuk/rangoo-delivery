import { db, productCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Product Category', () => {
	beforeEach(async () => {
		await db.delete(productCategoriesTable)
	})

	test('deve criar uma categoria de produto com sucesso', async () => {
		const data = [
			{
				name: 'Bebidas',
				slug: 'bebidas',
			},
			{
				name: 'Sobremesas',
				slug: 'sobremesas',
			},
		]

		await db.insert(productCategoriesTable).values(data)

		const saveCategory = await db.select().from(productCategoriesTable)

		expect(saveCategory).toHaveLength(2)

		expect(saveCategory[0].name).toBe('Bebidas')
		expect(saveCategory[0].slug).toBe('bebidas')
	})
})
