import { faker } from '@faker-js/faker'
import { db, userSubscriptionsTable } from '@rangoo/database'
import { makePlan } from '@rangoo/database/src/tests/factories/make-plan'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('POST /subscriptions', () => {
	it('should create a monthly subscription and calculate period end to 30 days', async () => {
		const user = await makeUser()
		const plan = await makePlan({ billingCycle: 'MONTHLY' })

		const response = await app.inject({
			method: 'POST',
			url: '/subscriptions',
			payload: { userId: user.id, planId: plan.id },
		})

		expect(response.statusCode).toBe(201)

		const responseData = response.json()

		const [subscription] = await db
			.select()
			.from(userSubscriptionsTable)
			.where(eq(userSubscriptionsTable.id, responseData.id))

		expect(subscription.status).toBe('ACTIVE')

		const diffInDays = dayjs(subscription.currentPeriodEnd).diff(
			dayjs(subscription.currentPeriodStart),
			'day',
		)
		expect(diffInDays).toBe(30)
	})

	it('should create a yearly subscription and calculate period end to 1 year', async () => {
		const user = await makeUser()
		const plan = await makePlan({ billingCycle: 'YEARLY' })

		const response = await app.inject({
			method: 'POST',
			url: '/subscriptions',
			payload: { userId: user.id, planId: plan.id },
		})

		expect(response.statusCode).toBe(201)

		const responseData = response.json()

		const [subscription] = await db
			.select()
			.from(userSubscriptionsTable)
			.where(eq(userSubscriptionsTable.id, responseData.id))

		const diffInYears = dayjs(subscription.currentPeriodEnd).diff(
			dayjs(subscription.currentPeriodStart),
			'year',
		)
		expect(diffInYears).toBe(1)
	})

	it('should return 404 if user does not exist', async () => {
		const plan = await makePlan()

		const response = await app.inject({
			method: 'POST',
			url: '/subscriptions',
			payload: { userId: faker.string.uuid(), planId: plan.id },
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 404 if plan does not exist', async () => {
		const user = await makeUser()

		const response = await app.inject({
			method: 'POST',
			url: '/subscriptions',
			payload: { userId: user.id, planId: faker.string.uuid() },
		})

		expect(response.statusCode).toBe(404)
	})
})
