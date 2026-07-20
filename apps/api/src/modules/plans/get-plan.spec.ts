import { faker } from '@faker-js/faker'
import { makePlan } from '@rangoo/database/src/tests/factories/make-plan'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('GET /plans/:planId', () => {
	it('should return 200 with plan details', async () => {
		const plan = await makePlan()

		const response = await app.inject({
			method: 'GET',
			url: `/plans/${plan.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.id).toBe(plan.id)
		expect(responseData.name).toBe(plan.name)
		expect(responseData.priceInCents).toBe(plan.priceInCents)
		expect(responseData.billingCycle).toBe(plan.billingCycle)
	})

	it('should return 404 if plan does not exist', async () => {
		const fakePlanId = faker.string.uuid()

		const response = await app.inject({
			method: 'GET',
			url: `/plans/${fakePlanId}`,
		})

		expect(response.statusCode).toBe(404)
	})
})
