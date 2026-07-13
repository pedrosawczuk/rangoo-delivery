import { and, db, eq, userAddressTable, usersTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { UserIdSchema } from '../../utils/schemas/user-id-schema'
import type { CreateUserAddressSchema } from './create-user-address-schema'

export async function createUserAddressModule(
	request: FastifyRequest<{
		Params: UserIdSchema
		Body: CreateUserAddressSchema
	}>,
	reply: FastifyReply,
) {
	const { userId } = request.params
	const {
		city,
		isDefault,
		neighborhood,
		state,
		street,
		streetNumber,
		zipCode,
		complement,
		type,
	} = request.body

	const [userExists] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, userId))

	if (!userExists) {
		throw new NotFoundError('User not found')
	}

	if (isDefault) {
		await db
			.update(userAddressTable)
			.set({ isDefault: false })
			.where(
				and(
					eq(userAddressTable.userId, userId),
					eq(userAddressTable.isDefault, true),
				),
			)
	}

	const [address] = await db
		.insert(userAddressTable)
		.values({
			userId,
			street: street,
			streetNumber: streetNumber,
			complement: complement,
			neighborhood: neighborhood,
			city: city,
			state: state,
			zipCode: zipCode,
			isDefault: isDefault,
			type: type,
		})
		.returning({ id: userAddressTable.id })

	return reply.status(201).send({ id: address.id })
}
