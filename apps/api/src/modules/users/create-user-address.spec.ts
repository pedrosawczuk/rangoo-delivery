import { faker } from '@faker-js/faker'
import { db, userAddressTable, usersTable } from '@rangoo/database'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserAddress } from '@rangoo/database/src/tests/factories/make-user-address'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../app'

describe('POST /users/:userId/address', () => {
	beforeEach(async () => {
		await db.delete(userAddressTable)
		await db.delete(usersTable)
	})

	test('should create a new address for the user and return status 201', async () => {
		const user = await makeUser()

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
			url: `/users/${user.id}/address`,
			payload,
		})

		expect(response.statusCode).toBe(201)
		
		const responseData = response.json()
		expect(responseData).toHaveProperty('id')

		const savedAddress = await db.select().from(userAddressTable)
		expect(savedAddress).toHaveLength(1)
		expect(savedAddress[0].userId).toBe(user.id)
		expect(savedAddress[0].street).toBe(payload.street)
		expect(savedAddress[0].isDefault).toBe(false)
	})

	test('should set old default address to false when creating a new default address', async () => {
		const user = await makeUser()
		const oldAddress = await makeUserAddress({ userId: user.id, isDefault: true })

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
			url: `/users/${user.id}/address`,
			payload,
		})

		expect(response.statusCode).toBe(201)

		const savedAddresses = await db.select().from(userAddressTable)
		expect(savedAddresses).toHaveLength(2)

		const savedOldAddress = savedAddresses.find((a) => a.id === oldAddress.id)
		const savedNewAddress = savedAddresses.find((a) => a.street === newStreet)

		expect(savedOldAddress?.isDefault).toBe(false)
		expect(savedNewAddress?.isDefault).toBe(true)
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
		const user = await makeUser()

		const response = await app.inject({
			method: 'POST',
			url: `/users/${user.id}/address`,
			payload: {},
		})

		expect(response.statusCode).toBe(400)
	})
})
