import { faker } from '@faker-js/faker'
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

describe('GET /restaurant/owner/:ownerId/:restaurantId', () => {
	test('should return 200 and the restaurant data', async () => {
		const owner = await makeUser()
		const category = await makeRestaurantCategory()
		const restaurant = await makeRestaurant({
			ownerId: owner.id,
			categoryId: category.id,
		})

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${owner.id}/${restaurant.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData).toHaveProperty('data')
		expect(responseData.data.id).toBe(restaurant.id)
		expect(responseData.data.ownerId).toBe(owner.id)
		expect(responseData.data.name).toBe(restaurant.name)
	})

	test('should return 404 if user (owner) does not exist', async () => {
		const fakeOwnerId = faker.string.uuid()
		const fakeRestaurantId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${fakeOwnerId}/${fakeRestaurantId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('User not Found')
	})

	test('should return 404 if restaurant does not exist or does not belong to owner', async () => {
		const owner = await makeUser()
		const fakeRestaurantId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${owner.id}/${fakeRestaurantId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Restaurant Not Exists')
	})

	test('should return 404 if trying to access a restaurant owned by someone else', async () => {
		const trueOwner = await makeUser()
		const hacker = await makeUser()

		const category = await makeRestaurantCategory()
		const restaurant = await makeRestaurant({
			ownerId: trueOwner.id,
			categoryId: category.id,
		})

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${hacker.id}/${restaurant.id}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Restaurant Not Exists')
	})

	test('should return 400 if IDs are not valid UUIDs', async () => {
		const fakeId = 'invalid-uuid'

		const response = await app.inject({
			method: 'GET',
			url: `/restaurant/owner/${fakeId}/${fakeId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
