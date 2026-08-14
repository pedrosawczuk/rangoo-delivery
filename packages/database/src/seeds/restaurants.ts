
import { fakerPT_BR as faker } from '@faker-js/faker'
import { db, restaurantTable } from '../index'

export async function restaurantSeed() {

    const USERS_ID = [
        "01a001c9-5b59-77be-815c-a7d1c772e352",
        "01a001c9-5c0c-718b-9476-e55430ecffd6",
        "01a001c9-5c65-74c7-8906-a63e9a033e8c",
        "01a001c9-5cc3-738c-9078-88a0c5b2d89d",
        "01a001c9-5d1e-725e-b5c6-5233a1eac5b2",
        "01a001c9-5d7c-770a-9bcb-d967a70469f6",
        "01a001c9-5dd5-7609-a2b9-36993c9cccf2",
        "01a001c9-5e2c-7409-9531-f01212c160a7",
        "01a001c9-5e7e-7169-b58a-6acad7a3e733",
        "01a001c9-5ed1-71dd-9fb7-54e07d8b694c",
        "01a001c9-5f22-775d-a104-c05453dd304d",
        "01a001c9-5f7f-74d8-b26b-8be077259fff",
        "01a001c9-5fd4-7119-81e9-830369f80913",
        "01a001c9-6025-71bf-82e9-3c2705bc1e1c",
        "01a001c9-607d-7176-b9a5-7dacc5151c52",
        "01a001c9-60d4-77b5-bd1b-d5037e39c927",
        "01a001c9-6127-713d-bc51-43bcd0afb306",
        "01a001c9-6178-7775-9e35-a1b334e7ce4e",
        "01a001c9-61cc-7070-88e6-852371bf8b52",
        "01a001c9-621e-7098-9fe7-148aeb978d91",
        "01a001c9-6273-70db-ba6d-9c0fd077a947",
        "01a001c9-62ca-762a-b05c-528e862fa473",
    ]

    const CATEGORIES_ID = [
        "01a001a7-2d51-7391-bbb8-4830a912e41b",
        "01a001a7-2dd7-720e-82b6-bf3b91af94db",
        "01a001a7-2ddd-7233-b272-0cce08c62f1e",
        "01a001a7-2de3-721c-b9b1-ed9deb421a8e",
        "01a001a7-2de9-707b-9c04-9b0fd35da226",
        "01a001a7-2dee-7168-8f6b-358264d68d75",
        "01a001a7-2df5-777f-9c5b-56cf5fe92214",
        "01a001a7-2dfa-7642-9c87-1f6655736734",
        "01a001a7-2dff-7589-9ecf-8d1ab4ea0c30",
        "01a001a7-2e05-719e-b8ec-64687284961d",
    ]

	const payload = {
		name: faker.company.name(),
        phone: String(faker.number.int({ min: 11111111111, max: 99999999999 })),
        description: faker.lorem.paragraph({min: 1, max: 1}), 
        document: String(faker.number.int({ min: 11111111111111, max: 99999999999999 })),
        ownerId: faker.helpers.arrayElement(USERS_ID),
        street: faker.location.street(),
        streetNumber: faker.location.buildingNumber(),
        complement: null,
        neighborhood: faker.location.direction(),
        city: faker.location.city(),
        state: faker.location.state({abbreviated: true}),
        zipCode: faker.location.zipCode({format: "########"}),
        categoryId: faker.helpers.arrayElement(CATEGORIES_ID),
		createdAt: faker.date.recent({ days: 100 }),
		updatedAt: faker.date.recent({ days: 30 }),
	}

	await db.insert(restaurantTable).values(payload)
}

const TOTAL_RESTAURANTS_SEED = 30

for (let i = 0; i < TOTAL_RESTAURANTS_SEED; i++) {
	await restaurantSeed()
	console.log(`\n Added ${i} \n`)
}
