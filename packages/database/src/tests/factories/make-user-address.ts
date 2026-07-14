import { faker } from '@faker-js/faker'
import { db, userAddressTable } from '../../index'

export async function makeUserAddress(
	override: Partial<typeof userAddressTable.$inferInsert> = {},
) {
	const addressData = {
		userId: faker.string.uuid(),
		street: faker.location.street(),
		streetNumber: faker.location.buildingNumber(),
		neighborhood: faker.location.county(),
		city: faker.location.city(),
		state: faker.location.state({ abbreviated: true }),
		zipCode: faker.location.zipCode(),
		isDefault: false,
		...override,
	}

	const [address] = await db
		.insert(userAddressTable)
		.values(addressData)
		.returning()

	return address
}
