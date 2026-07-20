import '@fastify/cookie'
import '@fastify/jwt'
import {
	authenticationLogsTable,
	db,
	eq,
	sessionsTable,
	usersTable,
} from '@rangoo/database'
import { env } from '@rangoo/env'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../../core/errors'
import { verifyPassword } from '../../utils/password'
import type { SignInSchema } from './sign-in-schema'

export async function signInModule(
	request: FastifyRequest<{ Body: SignInSchema }>,
	reply: FastifyReply,
) {
	const { email, password } = request.body

	const ipAddress = request.ip || null
	const userAgent = request.headers['user-agent'] || null

	const [user] = await db
		.select({
			id: usersTable.id,
			passwordHash: usersTable.passwordHash,
		})
		.from(usersTable)
		.where(eq(usersTable.email, email))

	if (!user) {
		await db.insert(authenticationLogsTable).values({
			emailAttempt: email,
			status: 'FAILED',
			ipAddress,
			userAgent,
		})

		throw new UnauthorizedError('Invalid credentials')
	}

	const isPasswordValid = await verifyPassword(user.passwordHash, password)

	if (!isPasswordValid) {
		await db.insert(authenticationLogsTable).values({
			userId: user.id,
			emailAttempt: email,
			status: 'FAILED',
			ipAddress,
			userAgent,
		})

		throw new UnauthorizedError('Invalid credentials')
	}

	const accessToken = await reply.jwtSign(
		{ sub: user.id },
		{ expiresIn: '15m' },
	)

	const refreshToken = await reply.jwtSign(
		{ sub: user.id, type: 'refresh' },
		{ expiresIn: '7d' },
	)

	const expiresAt = new Date()
	expiresAt.setDate(expiresAt.getDate() + 7)

	await Promise.all([
		db.insert(authenticationLogsTable).values({
			userId: user.id,
			emailAttempt: email,
			status: 'SUCCESS',
			ipAddress,
			userAgent,
		}),
		db.insert(sessionsTable).values({
			userId: user.id,
			refreshToken,
			ipAddress,
			userAgent,
			expiresAt,
		}),
	])

	return reply
		.setCookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: env.NODE_ENV === 'prod',
			path: '/',
			sameSite: 'strict',
		})
		.status(200)
		.send({ accessToken })
}
