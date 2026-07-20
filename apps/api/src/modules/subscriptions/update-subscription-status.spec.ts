import { faker } from '@faker-js/faker'
import { db, userSubscriptionsTable } from '@rangoo/database'
import { makePlan } from '@rangoo/database/src/tests/factories/make-plan'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserSubscription } from '@rangoo/database/src/tests/factories/make-user-subscription'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('PATCH /subscriptions/:subscriptionId/status', () => {
	it('should manually update subscription status to EXPIRED and return 204', async () => {
		const user = await makeUser()
		const plan = await makePlan()
		const subscription = await makeUserSubscription({
			userId: user.id,
			planId: plan.id,
			status: 'ACTIVE',
		})

		const response = await app.inject({
			method: 'PATCH',
			url: `/subscriptions/${subscription.id}/status`,
			payload: { status: 'EXPIRED' },
		})

		expect(response.statusCode).toBe(204)

		const [updatedSub] = await db
			.select()
			.from(userSubscriptionsTable)
			.where(eq(userSubscriptionsTable.id, subscription.id))

		expect(updatedSub.status).toBe('EXPIRED')
	})

	it('should return 400 if status is invalid', async () => {
		const user = await makeUser()
		const plan = await makePlan()
		const subscription = await makeUserSubscription({
			userId: user.id,
			planId: plan.id,
		})

		const response = await app.inject({
			method: 'PATCH',
			url: `/subscriptions/${subscription.id}/status`,
			payload: { status: 'PENDING' },
		})

		expect(response.statusCode).toBe(400)
	})

	it('should return 404 if subscription does not exist', async () => {
		const response = await app.inject({
			method: 'PATCH',
			url: `/subscriptions/${faker.string.uuid()}/status`,
			payload: { status: 'CANCELED' },
		})

		expect(response.statusCode).toBe(404)
	})
})
