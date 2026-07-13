import { faker } from '@faker-js/faker'
import { db, userAddressTable, usersTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../app'

describe('POST /users/:userId/address', () => {
	beforeEach(async () => {
		await db.delete(userAddressTable)
		await db.delete(usersTable)
	})

	test('should create a new address for the user and return status 201', async () => {
		const [createdUser] = await db
			.insert(usersTable)
			.values({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				passwordHash: faker.internet.password(),
				phone: faker.phone.number(),
				document: '12345678900',
			})
			.returning()

		const payload = {
			street: faker.location.street(),
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			isDefault: false,
		}

		const response = await app.inject({
			method: 'POST',
			url: `/users/${createdUser.id}/address`,
			payload,
		})

		if (response.statusCode !== 201) {
			console.error('Debug: Test failed. API Response:', response.body)
		}

		expect(response.statusCode).toBe(201)
		const responseData = response.json()
		expect(responseData).toHaveProperty('id')

		const savedAddress = await db.select().from(userAddressTable)
		expect(savedAddress).toHaveLength(1)
		expect(savedAddress[0].userId).toBe(createdUser.id)
		expect(savedAddress[0].street).toBe(payload.street)
		expect(savedAddress[0].isDefault).toBe(false)
	})

	test('should set old default address to false when creating a new default address', async () => {
		const [createdUser] = await db
			.insert(usersTable)
			.values({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				passwordHash: faker.internet.password(),
				phone: faker.phone.number(),
				document: '09876543211',
			})
			.returning()

		const oldStreet = faker.location.street()
		await db.insert(userAddressTable).values({
			userId: createdUser.id,
			street: oldStreet,
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			isDefault: true,
		})

		const newStreet = faker.location.street()
		const payload = {
			street: newStreet,
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			isDefault: true,
		}

		const response = await app.inject({
			method: 'POST',
			url: `/users/${createdUser.id}/address`,
			payload,
		})

		expect(response.statusCode).toBe(201)

		const savedAddresses = await db.select().from(userAddressTable)
		expect(savedAddresses).toHaveLength(2)

		const oldAddress = savedAddresses.find((a) => a.street === oldStreet)
		const newAddress = savedAddresses.find((a) => a.street === newStreet)

		expect(oldAddress?.isDefault).toBe(false)
		expect(newAddress?.isDefault).toBe(true)
	})

	test('should return 404 if user does not exist', async () => {
		const fakeId = faker.string.uuid()
		const payload = {
			street: faker.location.street(),
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
		}

		const response = await app.inject({
			method: 'POST',
			url: `/users/${fakeId}/address`,
			payload,
		})

		expect(response.statusCode).toBe(404)
		const responseData = response.json()
		expect(responseData.message).toBe('User not found')
	})

	test('should return 400 if payload is invalid', async () => {
		const [createdUser] = await db
			.insert(usersTable)
			.values({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				passwordHash: faker.internet.password(),
				phone: faker.phone.number(),
				document: '22222222222',
			})
			.returning()

		const response = await app.inject({
			method: 'POST',
			url: `/users/${createdUser.id}/address`,
			payload: {},
		})

		expect(response.statusCode).toBe(400)
	})
})
