import { faker } from '@faker-js/faker'
import { db, usersTable } from '../../index'

export async function makeUser(
	override: Partial<typeof usersTable.$inferInsert> = {},
) {
	const userData = {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		email: faker.internet.email(),
		passwordHash: faker.internet.password(),
		phone: faker.phone.number(),
		document: faker.string.numeric(11),
		...override,
	}

	const [user] = await db.insert(usersTable).values(userData).returning()

	return user
}
