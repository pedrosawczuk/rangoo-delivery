import { makePlan } from '@rangoo/database/src/tests/factories/make-plan'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserSubscription } from '@rangoo/database/src/tests/factories/make-user-subscription'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('GET /subscriptions', () => {
	it('should return 200 and respect pagination params', async () => {
		const user = await makeUser()
		const plan = await makePlan()

		await Promise.all(
			Array.from({ length: 5 }).map(() =>
				makeUserSubscription({ userId: user.id, planId: plan.id }),
			),
		)

		const response = await app.inject({
			method: 'GET',
			url: '/subscriptions?page=1&limit=2',
		})

		expect(response.statusCode).toBe(200)

		const responseData = response.json()
		expect(responseData.data).toHaveLength(2)
		expect(responseData.meta.totalCount).toBe(5)
		expect(responseData.meta.page).toBe(1)
		expect(responseData.meta.limit).toBe(2)
		expect(responseData.meta.totalPages).toBe(3)
	})
})
