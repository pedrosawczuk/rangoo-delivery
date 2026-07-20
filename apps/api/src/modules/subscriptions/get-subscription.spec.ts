import { faker } from '@faker-js/faker'
import { makePlan } from '@rangoo/database/src/tests/factories/make-plan'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserSubscription } from '@rangoo/database/src/tests/factories/make-user-subscription'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('GET /subscriptions/:subscriptionId', () => {
	it('should return 200 with subscription details', async () => {
		const user = await makeUser()
		const plan = await makePlan()
		const subscription = await makeUserSubscription({
			userId: user.id,
			planId: plan.id,
		})

		const response = await app.inject({
			method: 'GET',
			url: `/subscriptions/${subscription.id}`,
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.id).toBe(subscription.id)
		expect(responseData.userId).toBe(user.id)
		expect(responseData.planId).toBe(plan.id)
		expect(responseData.status).toBe(subscription.status)
	})

	it('should return 404 if subscription does not exist', async () => {
		const response = await app.inject({
			method: 'GET',
			url: `/subscriptions/${faker.string.uuid()}`,
		})

		expect(response.statusCode).toBe(404)
	})
})
