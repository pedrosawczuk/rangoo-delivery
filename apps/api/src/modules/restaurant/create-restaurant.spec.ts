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
import { app } from '../../app'

describe('POST /restaurant', () => {
	test('should create a new restaurant and return status 201', async () => {
		const owner = await makeUser()
		const category = await makeRestaurantCategory()

		const payload = {
			name: faker.company.name(),
			phone: faker.phone.number(),
			description: faker.lorem.paragraph(),
			categoryId: category.id,
			ownerId: owner.id,
			street: faker.location.street(),
			streetNumber: faker.location.buildingNumber(),
			complement: faker.location.secondaryAddress(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			document: faker.number
				.int({ min: 10000000000000, max: 99999999999999 })
				.toString(),
		}

		const response = await app.inject({
			method: 'POST',
			url: '/restaurant',
			payload,
		})

		expect(response.statusCode).toBe(201)

		const responseData = response.json()
		expect(responseData).toHaveProperty('restaurantId')

		const savedRestaurants = await db.select().from(restaurantTable)
		expect(savedRestaurants).toHaveLength(1)
		expect(savedRestaurants[0].name).toBe(payload.name)
		expect(savedRestaurants[0].ownerId).toBe(owner.id)
		expect(savedRestaurants[0].categoryId).toBe(category.id)
	})

	test('should return 500 if category does not exist (FK Constraint)', async () => {
		const owner = await makeUser()
		const fakeCategoryId = faker.string.uuid()

		const payload = {
			name: faker.company.name(),
			phone: faker.phone.number(),
			description: faker.lorem.paragraph(),
			categoryId: fakeCategoryId,
			ownerId: owner.id,
			street: faker.location.street(),
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			document: faker.number
				.int({ min: 10000000000000, max: 99999999999999 })
				.toString(),
		}

		const response = await app.inject({
			method: 'POST',
			url: '/restaurant',
			payload,
		})

		expect(response.statusCode).toBe(500)
	})

	test('should return 400 if payload is invalid (Zod Validation)', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/restaurant',
			payload: {},
		})

		expect(response.statusCode).toBe(400)
	})

	test('should return 500 if document already exists (Unique Constraint)', async () => {
		const owner = await makeUser()
		const category = await makeRestaurantCategory()
		const existingRestaurant = await makeRestaurant({
			ownerId: owner.id,
			categoryId: category.id,
		})

		const payload = {
			name: faker.company.name(),
			phone: faker.phone.number(),
			description: faker.lorem.paragraph(),
			categoryId: category.id,
			ownerId: owner.id,
			street: faker.location.street(),
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			document: existingRestaurant.document,
		}

		const response = await app.inject({
			method: 'POST',
			url: '/restaurant',
			payload,
		})

		expect(response.statusCode).toBe(500)
	})
})
