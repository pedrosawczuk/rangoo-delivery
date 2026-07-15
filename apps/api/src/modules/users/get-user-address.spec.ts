import { faker } from '@faker-js/faker'
import { db, userAddressTable, usersTable } from '@rangoo/database'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserAddress } from '@rangoo/database/src/tests/factories/make-user-address'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../app'

describe('GET /users/:userId/address/:addressId', () => {
	beforeEach(async () => {
		await db.delete(userAddressTable)
		await db.delete(usersTable)
	})

	test('should return 200 and the user address data', async () => {
		const user = await makeUser()
		const address = await makeUserAddress({ userId: user.id })

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/address/${address.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.id).toBe(address.id)
		expect(responseData.userId).toBe(user.id)
		expect(responseData.street).toBe(address.street)
	})

	test('should return 404 if address does not exist', async () => {
		const user = await makeUser()
		const fakeAddressId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/address/${fakeAddressId}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Address not found')
	})

	test('should return 404 if trying to read an address from another user', async () => {
		const trueOwner = await makeUser()
		const hacker = await makeUser()
		const address = await makeUserAddress({ userId: trueOwner.id })

		// O hacker tenta usar o próprio userId para buscar o addressId do dono verdadeiro
		const response = await app.inject({
			method: 'GET',
			url: `/users/${hacker.id}/address/${address.id}`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Address not found')
	})

	test('should return 400 if IDs are not valid UUIDs', async () => {
		const fakeId = 'invalid-uuid'

		const response = await app.inject({
			method: 'GET',
			url: `/users/${fakeId}/address/${fakeId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
