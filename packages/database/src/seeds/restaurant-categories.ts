import { fakerPT_BR as faker } from '@faker-js/faker'
import { db, restaurantCategoriesTable } from '..'

export async function restaurantCategories() {
	const name = faker.company.catchPhraseNoun()
	const slug = name
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')

	const payload = {
		name,
		slug,
		createdAt: faker.date.recent({ days: 120 }),
	}

	await db.insert(restaurantCategoriesTable).values(payload)
}

const TOTAL_RESTAURANT_CATEGORIES = 10

for (let i = 0; i < TOTAL_RESTAURANT_CATEGORIES; i++) {
	await restaurantCategories()
	console.log(`\n Added ${i} \n`)
}
