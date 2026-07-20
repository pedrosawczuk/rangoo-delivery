import { faker } from '@faker-js/faker'
import { db, plansTable } from '@rangoo/database'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('POST /plans', () => {
	it('should create a new plan and return status 201', async () => {
		const requestBody = {
			name: faker.commerce.productName(),
			priceInCents: 9990,
			billingCycle: 'MONTHLY',
			active: true,
		}

		const response = await app.inject({
			method: 'POST',
			url: '/plans',
			payload: requestBody,
		})

		expect(response.statusCode).toBe(201)

		const responseData = response.json()
		expect(responseData).toHaveProperty('id')

		const [plan] = await db
			.select()
			.from(plansTable)
			.where(eq(plansTable.id, responseData.id))

		expect(plan).toBeDefined()
		expect(plan.name).toBe(requestBody.name)
		expect(plan.priceInCents).toBe(requestBody.priceInCents)
		expect(plan.billingCycle).toBe(requestBody.billingCycle)
		expect(plan.active).toBe(true)
	})

	it('should return 400 if priceInCents is negative', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/plans',
			payload: {
				name: 'Invalid Plan',
				priceInCents: -100,
				billingCycle: 'MONTHLY',
			},
		})

		expect(response.statusCode).toBe(400)
	})
})
