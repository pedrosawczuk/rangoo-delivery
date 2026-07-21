import { and, db, eq, userAddressTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors/not-found-error'
import type { AddressIdSchema } from '@/utils/schemas/address-id-schema'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'
import type { UpdateUserAddressSchema } from './update-user-address-schema'

export async function updateUserAddressModule(
	request: FastifyRequest<{
		Params: UserIdSchema & AddressIdSchema
		Body: UpdateUserAddressSchema
	}>,
	reply: FastifyReply,
) {
	const { userId, addressId } = request.params
	const {
		city,
		complement,
		isDefault,
		neighborhood,
		state,
		street,
		streetNumber,
		type,
		zipCode,
	} = request.body

	const [address] = await db
		.select()
		.from(userAddressTable)
		.where(
			and(
				eq(userAddressTable.userId, userId),
				eq(userAddressTable.id, addressId),
			),
		)

	if (!address) throw new NotFoundError('Address not found')

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

	if (type === 'HOME') {
		await db
			.update(userAddressTable)
			.set({ type: null })
			.where(
				and(
					eq(userAddressTable.userId, userId),
					eq(userAddressTable.type, 'HOME'),
				),
			)
	} else if (type === 'WORK') {
		await db
			.update(userAddressTable)
			.set({ type: null })
			.where(
				and(
					eq(userAddressTable.userId, userId),
					eq(userAddressTable.type, 'WORK'),
				),
			)
	}

	const [updatedAddress] = await db
		.update(userAddressTable)
		.set({
			city,
			complement,
			isDefault,
			neighborhood,
			state,
			street,
			streetNumber,
			type,
			zipCode,
		})
		.where(
			and(
				eq(userAddressTable.userId, userId),
				eq(userAddressTable.id, addressId),
			),
		)
		.returning()

	return reply.status(200).send({ updatedAddress })
}
