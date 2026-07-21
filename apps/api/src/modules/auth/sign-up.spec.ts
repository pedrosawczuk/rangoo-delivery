import { faker } from '@faker-js/faker'
import { db, usersTable } from '@rangoo/database'
import { describe, expect, test } from 'vitest'
import { app } from '@/app'

describe('POST /auth/sign-up', () => {
	test('should create a new user and return status 201', async () => {
		const requestBody = {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: faker.internet.email(),
			phone: faker.phone.number({ style: 'human' }),
			document: faker.number
				.int({ min: 10000000000, max: 99999999999 })
				.toString(),
			passwordRaw: faker.internet.password(),
		}

		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-up',
			payload: requestBody,
		})

		if (response.statusCode !== 201) {
			console.error(`Debug Error: ${response.json()}`)
		}

		expect(response.statusCode).toBe(201)

		const responseData = response.json()
		expect(responseData).toHaveProperty('id')

		const savedUser = await db.select().from(usersTable)

		expect(savedUser).toHaveLength(1)
		expect(savedUser[0].firstName).toBe(requestBody.firstName)
		expect(savedUser[0].email).toBe(requestBody.email.toLowerCase())
		expect(savedUser[0].passwordHash).not.toBe(requestBody.passwordRaw)
	})
})
