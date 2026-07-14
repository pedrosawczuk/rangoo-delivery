import { faker } from '@faker-js/faker'
import { db, userAddressTable, usersTable } from '@rangoo/database'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserAddress } from '@rangoo/database/src/tests/factories/make-user-address'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../app'

describe('DELETE /:userId/address/:addressId', () => {
	beforeEach(async () => {
		await db.delete(userAddressTable)
		await db.delete(usersTable)
	})

	test('should delete a user address and return status 204', async () => {
		const user = await makeUser()
		const address = await makeUserAddress({ userId: user.id, isDefault: false })

		const response = await app.inject({
			method: 'DELETE',
			url: `/users/${user.id}/address/${address.id}`,
		})

		expect(response.statusCode).toBe(204)

		const savedUserAddress = await db.select().from(userAddressTable)
		expect(savedUserAddress).toHaveLength(0)
	})

	test('should try delete a user address default and return 409', async () => {
		const user = await makeUser()
		const address = await makeUserAddress({ userId: user.id, isDefault: true })

		const response = await app.inject({
			method: 'DELETE',
			url: `/users/${user.id}/address/${address.id}`,
		})

		expect(response.statusCode).toBe(409)

		const savedUserAddress = await db.select().from(userAddressTable)
		expect(savedUserAddress).toHaveLength(1)
	})

	test('should return 404 if address does not exist', async () => {
		const user = await makeUser()
		const fakeAddressId = faker.string.uuid()

		const response = await app.inject({
			method: 'DELETE',
			url: `/users/${user.id}/address/${fakeAddressId}`,
		})

		expect(response.statusCode).toBe(404)
		const responseData = response.json()
		expect(responseData.message).toBe('Address Not Found')
	})

	test('should return 400 if route params are invalid', async () => {
		const fakeId = 'invalid-uuid-format'

		const response = await app.inject({
			method: 'DELETE',
			url: `/users/${fakeId}/address/${fakeId}`,
		})

		expect(response.statusCode).toBe(400)
	})
})
