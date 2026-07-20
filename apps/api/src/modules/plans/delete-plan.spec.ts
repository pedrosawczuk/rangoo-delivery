import { faker } from '@faker-js/faker'
import { db, plansTable } from '@rangoo/database'
import { makePlan } from '@rangoo/database/src/tests/factories/make-plan'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('DELETE /plans/:planId', () => {
	it('should soft delete a plan (set active to false) and return 204', async () => {
		const plan = await makePlan({ active: true })

		const response = await app.inject({
			method: 'DELETE',
			url: `/plans/${plan.id}`,
		})

		expect(response.statusCode).toBe(204)

		const [deletedPlan] = await db
			.select()
			.from(plansTable)
			.where(eq(plansTable.id, plan.id))

		expect(deletedPlan).toBeDefined()
		expect(deletedPlan.active).toBe(false)
	})

	it('should return 404 if plan does not exist', async () => {
		const fakePlanId = faker.string.uuid()

		const response = await app.inject({
			method: 'DELETE',
			url: `/plans/${fakePlanId}`,
		})

		expect(response.statusCode).toBe(404)
	})
})
