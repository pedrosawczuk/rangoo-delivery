import { faker } from '@faker-js/faker'
import { db, userAddressTable, usersTable } from '@rangoo/database'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserAddress } from '@rangoo/database/src/tests/factories/make-user-address'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../app'

describe('GET /users/:userId/address', () => {
	beforeEach(async () => {
		await db.delete(userAddressTable)
		await db.delete(usersTable)
	})

	test('should list user addresses and return status 200', async () => {
		const user = await makeUser()

		await makeUserAddress({ userId: user.id })
		await makeUserAddress({ userId: user.id })
		await makeUserAddress({ userId: user.id })

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/address`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(3)
		expect(responseData.meta.totalCount).toBe(3)
		expect(responseData.meta.page).toBe(1)
	})

	test('should paginate user addresses correctly', async () => {
		const user = await makeUser()

		await makeUserAddress({ userId: user.id })
		await makeUserAddress({ userId: user.id })
		await makeUserAddress({ userId: user.id })
		await makeUserAddress({ userId: user.id })
		await makeUserAddress({ userId: user.id })

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/address?page=2&limit=2`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(5)
		expect(responseData.meta.totalPages).toBe(3)
		expect(responseData.meta.page).toBe(2)
		expect(responseData.meta.limit).toBe(2)
	})

	test('should return an empty list if user has no addresses', async () => {
		const user = await makeUser()

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/address`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(0)
		expect(responseData.meta.totalCount).toBe(0)
	})

	test('should return 404 if user does not exist', async () => {
		const fakeId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/users/${fakeId}/address`,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('User not found')
	})

	test('should return 400 if pagination queries are invalid', async () => {
		const user = await makeUser()

		const response = await app.inject({
			method: 'GET',
			url: `/users/${user.id}/address?page=-1&limit=abc`,
		})

		expect(response.statusCode).toBe(400)
	})
})
