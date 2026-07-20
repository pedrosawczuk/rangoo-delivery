import { faker } from '@faker-js/faker'
import { db, plansTable } from '@rangoo/database'
import { makePlan } from '@rangoo/database/src/tests/factories/make-plan'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('PUT /plans/:planId', () => {
	it('should fully update a plan and return 204', async () => {
		const plan = await makePlan()

		const requestBody = {
			name: 'Updated Plan Name',
			priceInCents: 15000,
			billingCycle: 'YEARLY',
			active: false,
		}

		const response = await app.inject({
			method: 'PUT',
			url: `/plans/${plan.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(204)

		const [updatedPlan] = await db
			.select()
			.from(plansTable)
			.where(eq(plansTable.id, plan.id))

		expect(updatedPlan.name).toBe(requestBody.name)
		expect(updatedPlan.priceInCents).toBe(requestBody.priceInCents)
		expect(updatedPlan.billingCycle).toBe(requestBody.billingCycle)
		expect(updatedPlan.active).toBe(requestBody.active)
	})

	it('should partially update a plan and return 204', async () => {
		const plan = await makePlan({ name: 'Original Name' })

		const requestBody = {
			priceInCents: 9999,
		}

		const response = await app.inject({
			method: 'PUT',
			url: `/plans/${plan.id}`,
			payload: requestBody,
		})

		expect(response.statusCode).toBe(204)

		const [updatedPlan] = await db
			.select()
			.from(plansTable)
			.where(eq(plansTable.id, plan.id))

		expect(updatedPlan.priceInCents).toBe(requestBody.priceInCents)
		expect(updatedPlan.name).toBe('Original Name')
	})

	it('should return 404 if plan does not exist', async () => {
		const fakePlanId = faker.string.uuid()

		const response = await app.inject({
			method: 'PUT',
			url: `/plans/${fakePlanId}`,
			payload: { priceInCents: 100 },
		})

		expect(response.statusCode).toBe(404)
	})
})
