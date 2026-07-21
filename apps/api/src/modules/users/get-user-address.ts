import { and, db, eq, userAddressTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '@/core/errors'
import type { AddressIdSchema } from '@/utils/schemas/address-id-schema'
import type { UserIdSchema } from '@/utils/schemas/user-id-schema'

export async function getUserAddressModule(
	request: FastifyRequest<{
		Params: UserIdSchema & AddressIdSchema
	}>,
	reply: FastifyReply,
) {
	const { userId, addressId } = request.params

	const [address] = await db
		.select()
		.from(userAddressTable)
		.where(
			and(
				eq(userAddressTable.id, addressId),
				eq(userAddressTable.userId, userId),
			),
		)

	if (!address) {
		throw new NotFoundError('Address not found')
	}

	return reply.status(200).send(address)
}
