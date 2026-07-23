import { faker } from '@faker-js/faker'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'
import { hashingPassword } from '../../utils/password'

describe('POST /auth/sign-in', () => {
	it('should authenticate user and return access token + refresh token cookie', async () => {
		const rawPassword = 'my-super-secret-password'
		const passwordHash = await hashingPassword(rawPassword)

		const user = await makeUser({ passwordHash })

		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-in',
			payload: {
				email: user.email,
				password: rawPassword,
			},
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData).toHaveProperty('accessToken')

		const cookies = response.cookies
		expect(cookies).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'refreshToken',
					httpOnly: true,
					path: '/',
				}),
			]),
		)
	})

	it('should return 401 if email does not exist', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-in',
			payload: {
				email: faker.internet.email(),
				password: 'some-password',
			},
		})

		expect(response.statusCode).toBe(401)
		const responseData = response.json()
		expect(responseData.message).toBe('Invalid credentials')
	})

	it('should return 401 if password does not match', async () => {
		const passwordHash = await hashingPassword('correct-password')
		const user = await makeUser({ passwordHash })

		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-in',
			payload: {
				email: user.email,
				password: 'wrong-password',
			},
		})

		expect(response.statusCode).toBe(401)
		const responseData = response.json()
		expect(responseData.message).toBe('Invalid credentials')
	})

	it('should return 400 if email format is invalid', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/auth/sign-in',
			payload: {
				email: 'not-an-email',
				password: 'some-password',
			},
		})

		expect(response.statusCode).toBe(400)
	})
})
