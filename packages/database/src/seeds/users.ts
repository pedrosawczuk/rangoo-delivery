import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { db, usersTable } from '../index'

export async function usersSeed() {
	const payload = {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		phone: String(faker.number.int({ min: 11111111111, max: 99999999999 })),
		document: String(faker.number.int({ min: 1111111111, max: 99999999999 })),
		passwordHash: await hash(faker.internet.password({ length: 12 })),
		email: faker.internet
			.email({
				provider: 'gmail.com',
			})
			.toLowerCase(),
		createdAt: faker.date.recent({ days: 100 }),
		updatedAt: faker.date.recent({ days: 30 }),
	}

	await db.insert(usersTable).values(payload)
}

const TOTAL_SEEDED_USERS = 300

for (let i = 0; i < TOTAL_SEEDED_USERS; i++) {
	await usersSeed()
	console.log(`\n Added ${i} \n`)
}
