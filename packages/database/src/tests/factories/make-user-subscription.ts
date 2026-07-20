import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { db, userSubscriptionsTable } from '../../index'

export async function makeUserSubscription(
	override: Partial<typeof userSubscriptionsTable.$inferInsert> = {},
) {
	const subscriptionData = {
		userId: faker.string.uuid(),
		planId: faker.string.uuid(),
		status: faker.helpers.arrayElement([
			'ACTIVE',
			'CANCELED',
			'PAST_DUE',
			'EXPIRED',
		] as const),
		currentPeriodStart: dayjs().toDate(),
		currentPeriodEnd: dayjs().add(30, 'day').toDate(),
		...override,
	}

	const [subscription] = await db
		.insert(userSubscriptionsTable)
		.values(subscriptionData)
		.returning()

	return subscription
}
