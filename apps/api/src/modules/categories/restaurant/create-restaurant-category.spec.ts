import { db, restaurantCategoriesTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Restaurant Category', () => {
	beforeEach(async () => {
		await db.delete(restaurantCategoriesTable)
	})

	test('deve criar uma categoria de restaurante com sucesso', async () => {
		const data = [
			{
				name: 'Pizzaria',
				slug: 'pizzaria',
			},
			{
				name: 'Gastro Bar',
				slug: 'gastro-bar',
			},
		]

		await db.insert(restaurantCategoriesTable).values(data)

		const saveCategory = await db.select().from(restaurantCategoriesTable)

		expect(saveCategory).toHaveLength(2)

		expect(saveCategory[0].name).toBe('Pizzaria')
		expect(saveCategory[0].slug).toBe('pizzaria')
	})
})
