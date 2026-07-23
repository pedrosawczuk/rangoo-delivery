import { faker } from '@faker-js/faker'
import { db, userAddressTable } from '@rangoo/database'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserAddress } from '@rangoo/database/src/tests/factories/make-user-address'
import { describe, expect, test } from 'vitest'
import { app } from '@/app'

describe('PUT /users/:userId/address/:addressId', () => {
	test('should update a user address and return status 200', async () => {
		const user = await makeUser()
		const address = await makeUserAddress({ userId: user.id })

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
			method: 'PUT',
			url: `/users/${user.id}/address/${address.id}`,
			payload,
		})

		expect(response.statusCode).toBe(200)

		const updatedAddress = await db.select().from(userAddressTable)
		expect(updatedAddress).toHaveLength(1)
		expect(updatedAddress[0].street).toBe(payload.street)
		expect(updatedAddress[0].isDefault).toBe(false)
	})

	test('should set old default address to false when updating another address to default', async () => {
		const user = await makeUser()
		const addressA = await makeUserAddress({ userId: user.id, isDefault: true })
		const addressB = await makeUserAddress({
			userId: user.id,
			isDefault: false,
		})

		const payload = {
			street: faker.location.street(),
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			isDefault: true,
		}

		const response = await app.inject({
			method: 'PUT',
			url: `/users/${user.id}/address/${addressB.id}`,
			payload,
		})

		expect(response.statusCode).toBe(200)

		const savedAddresses = await db.select().from(userAddressTable)
		expect(savedAddresses).toHaveLength(2)

		const savedA = savedAddresses.find((a) => a.id === addressA.id)
		const savedB = savedAddresses.find((a) => a.id === addressB.id)

		expect(savedA?.isDefault).toBe(false)
		expect(savedB?.isDefault).toBe(true)
	})

	test('should remove HOME or WORK type from old addresses when updating a new one to the same type', async () => {
		const user = await makeUser()

		const homeAddress = await makeUserAddress({ userId: user.id, type: 'HOME' })
		const workAddress = await makeUserAddress({ userId: user.id, type: 'WORK' })

		const payload = {
			street: faker.location.street(),
			streetNumber: faker.location.buildingNumber(),
			neighborhood: faker.location.county(),
			city: faker.location.city(),
			state: faker.location.state({ abbreviated: true }),
			zipCode: faker.location.zipCode(),
			type: 'HOME',
		}

		const response = await app.inject({
			method: 'PUT',
			url: `/users/${user.id}/address/${workAddress.id}`,
			payload,
		})

		expect(response.statusCode).toBe(200)

		const savedAddresses = await db.select().from(userAddressTable)

		const savedHome = savedAddresses.find((a) => a.id === homeAddress.id)
		const savedWork = savedAddresses.find((a) => a.id === workAddress.id)

		expect(savedHome?.type).toBeNull()
		expect(savedWork?.type).toBe('HOME')
	})

	test('should return 404 if address does not exist', async () => {
		const user = await makeUser()
		const fakeAddressId = faker.string.uuid()

		const payload = {
			street: faker.location.street(),
		}

		const response = await app.inject({
			method: 'PUT',
			url: `/users/${user.id}/address/${fakeAddressId}`,
			payload,
		})

		expect(response.statusCode).toBe(404)

		const responseData = response.json()
		expect(responseData.message).toBe('Address not found')
	})

	test('should return 400 if payload is invalid', async () => {
		const user = await makeUser()
		const address = await makeUserAddress({ userId: user.id })

		const invalidPayload = { type: 'INVALID' }

		const responseInvalid = await app.inject({
			method: 'PUT',
			url: `/users/${user.id}/address/${address.id}`,
			payload: invalidPayload,
		})

		expect(responseInvalid.statusCode).toBe(400)
	})
})
