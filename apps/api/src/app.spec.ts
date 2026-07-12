import { expect, test } from 'vitest'
import { app } from './app'

test('GET / return Hello World', async () => {
	const response = await app.inject({
		method: 'GET',
		url: '/',
	})

	expect(response.statusCode).toBe(200)
})
