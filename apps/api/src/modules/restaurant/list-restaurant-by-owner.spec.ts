import {
	db,
	restaurantCategoriesTable,
	restaurantTable,
	usersTable,
} from '@rangoo/database'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { makeRestaurantCategory } from '@rangoo/database/src/tests/factories/make-restaurant-category'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { describe, expect, test } from 'vitest'
import { app } from '@/app'

describe('GET /restaurant/owner/:ownerId', () => {
	test('should return 200 with empty list if owner has no restaurants', async () => {
		const owner = await makeUser()

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${owner.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(0)
		expect(responseData.meta.totalCount).toBe(0)
	})

	test('should return 200 with restaurants belonging ONLY to the owner', async () => {
		const ownerA = await makeUser()
		const ownerB = await makeUser()
		const category = await makeRestaurantCategory()

		// Criando 2 restaurantes para o Dono A
		await Promise.all([
			makeRestaurant({ ownerId: ownerA.id, categoryId: category.id }),
			makeRestaurant({ ownerId: ownerA.id, categoryId: category.id }),
		])

		// Criando 1 restaurante para o Dono B
		await makeRestaurant({ ownerId: ownerB.id, categoryId: category.id })

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${ownerA.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(2)

		// Garantindo que todos os itens da lista pertencem ao Dono A
		const allBelongToOwnerA = responseData.data.every(
			(rest: any) => rest.ownerId === ownerA.id,
		)
		expect(allBelongToOwnerA).toBe(true)
	})

	test('should return 200 and respect pagination params', async () => {
		const owner = await makeUser()
		const category = await makeRestaurantCategory()

		await Promise.all(
			Array.from({ length: 5 }).map(() =>
				makeRestaurant({ ownerId: owner.id, categoryId: category.id }),
			),
		)

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${owner.id}?page=1&limit=2`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()

		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(5)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(2)
		expect(responseData.meta.totalPages).toBe(3)
	})

	test('should return 400 if ownerId is not a valid UUID', async () => {
		const fakeId = 'invalid-uuid'

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${fakeId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
