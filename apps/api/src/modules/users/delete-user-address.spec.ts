import { faker } from '@faker-js/faker'
import { db, userAddressTable, usersTable } from '@rangoo/database'
import { beforeEach, describe, expect, test } from 'vitest'
import { app } from '../../app'

describe('DELETE /:userId/address/:addressId', () => {
	beforeEach(async () => {
		await db.delete(userAddressTable)
	})

	test('should delete a user address and return status 204', async () => {
		const [createdUser] = await db
			.insert(usersTable)
			.values({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				passwordHash: faker.internet.password(),
				phone: faker.phone.number(),
				document: faker.number
					.int({ min: 10000000000, max: 99999999999 })
					.toString(),
			})
			.returning({ id: usersTable.id })

		const [createdAddress] = await db
			.insert(userAddressTable)
			.values({
				userId: createdUser.id,
				street: faker.location.street(),
				streetNumber: faker.location.buildingNumber(),
				neighborhood: faker.location.county(),
				city: faker.location.city(),
				state: faker.location.state({ abbreviated: true }),
				zipCode: faker.location.zipCode(),
				isDefault: false,
			})
			.returning({ id: userAddressTable.id })

		const response = await app.inject({
			method: 'DELETE',
			path: `/users/${createdUser.id}/address/${createdAddress.id}`,
		})

		if (response.statusCode !== 204) {
			console.error(`Debug Error: ${response.json()}`)
		}

		expect(response.statusCode).toBe(204)

		const savedUserAddress = await db.select().from(userAddressTable)
		expect(savedUserAddress).toHaveLength(0)
	})

	test('should try delete a user address default and return 409', async () => {
		const [createdUser] = await db
			.insert(usersTable)
			.values({
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				passwordHash: faker.internet.password(),
				phone: faker.phone.number(),
				document: faker.number
					.int({ min: 10000000000, max: 99999999999 })
					.toString(),
			})
			.returning({ id: usersTable.id })

		const [createdAddress] = await db
			.insert(userAddressTable)
			.values({
				userId: createdUser.id,
				street: faker.location.street(),
				streetNumber: faker.location.buildingNumber(),
				neighborhood: faker.location.county(),
				city: faker.location.city(),
				state: faker.location.state({ abbreviated: true }),
				zipCode: faker.location.zipCode(),
				isDefault: true,
			})
			.returning({ id: userAddressTable.id })

        const response = await app.inject({
            method: 'DELETE',
            url: `/users/${createdUser.id}/address/${createdAddress.id}`
        })

        if (response.statusCode !== 409) {
			console.error(`Debug Error: ${response.json()}`)
		}

        expect(response.statusCode).toBe(409)
        
	})
})
