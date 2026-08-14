import { fakerPT_BR as faker } from '@faker-js/faker'
import { db, productCategoriesTable } from '..'

export async function productCategories() {
	const name = faker.commerce.department()
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
		updatedAt: new Date(),
	}

	await db.insert(productCategoriesTable).values(payload)
}

const TOTAL_PRODUCT_CATEGORIES = 10

for (let i = 0; i < TOTAL_PRODUCT_CATEGORIES; i++) {
	await productCategories()
	console.log(`\n Added product category ${i + 1} \n`)
}
