import { and, db, eq, userAddressTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import { AdressConflictError } from '@/core/errors/address-conflict-error'
import type { AddressIdSchema } from '@/utils/schemas/address-id-schema'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'

export async function deleteUserAddresModule(
	request: FastifyRequest<{ Params: UserIdSchema & AddressIdSchema }>,
	reply: FastifyReply,
) {
	const { userId, addressId } = request.params

	const [addressExists] = await db
		.select()
		.from(userAddressTable)
		.where(
			and(
				eq(userAddressTable.userId, userId),
				eq(userAddressTable.id, addressId),
			),
		)

	if (!addressExists) throw new NotFoundError('Address Not Found')

	if (addressExists.isDefault) throw new AdressConflictError()

	await db
		.delete(userAddressTable)
		.where(
			and(
				eq(userAddressTable.userId, userId),
				eq(userAddressTable.id, addressId),
			),
		)

	return reply.status(204).send()
}
