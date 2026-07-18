import { db, eq, or, usersTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ConflictError } from '@/core/errors'
import { hashingPassword } from '@/utils/password'
import type { SignUpSchema } from './sign-up-schema'

export async function signUpModule(
	request: FastifyRequest<{ Body: SignUpSchema }>,
	reply: FastifyReply,
) {
	const { firstName, lastName, email, phone, document, passwordRaw } =
		request.body

	const [existingUser] = await db
		.select({
			email: usersTable.email,
			document: usersTable.document,
			phone: usersTable.phone,
		})
		.from(usersTable)
		.where(
			or(
				eq(usersTable.email, email),
				eq(usersTable.document, document),
				eq(usersTable.phone, phone),
			),
		)

	if (existingUser) {
		if (existingUser.email === email) {
			throw new ConflictError('Email already exists')
		}
		if (existingUser.document === document) {
			throw new ConflictError('Document already exists')
		}
		if (existingUser.phone === phone) {
			throw new ConflictError('Phone already exists')
		}
	}

	const passwordHash = await hashingPassword(passwordRaw)

	const [newUser] = await db
		.insert(usersTable)
		.values({
			document,
			email,
			firstName,
			lastName,
			passwordHash,
			phone,
		})
		.returning({ id: usersTable.id })

	return reply.status(201).send({ id: newUser.id })
}
