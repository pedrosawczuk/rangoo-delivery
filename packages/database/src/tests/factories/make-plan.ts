import { faker } from '@faker-js/faker'
import { db, plansTable } from '../../index'

export async function makePlan(
	override: Partial<typeof plansTable.$inferInsert> = {},
) {
	const planData = {
		name: faker.commerce.productName(),
		priceInCents: faker.number.int({ min: 1000, max: 99999 }),
		billingCycle: faker.helpers.arrayElement(['MONTHLY', 'YEARLY'] as const),
		active: true,
		...override,
	}

	const [plan] = await db.insert(plansTable).values(planData).returning()

	return plan
}
