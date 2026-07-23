import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { env } from '@rangoo/env'
import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { AppError } from '@/core/errors/app-error'
import { authRoutes } from '@/modules/auth/auth-routes'
import { categoriesRoutes } from '@/modules/categories/categories-routes'
import { menuRoutes } from '@/modules/menu/menu-routes'
import { orderRoutes } from '@/modules/orders/order-routes'
import { plansRoutes } from '@/modules/plans/plans-routes'
import { restaurantRoutes } from '@/modules/restaurant/restaurant-routes'
import { subscriptionsRoutes } from '@/modules/subscriptions/subscriptions-routes'
import { userRoutes } from '@/modules/users/users-routes'

export const app = fastify({
	logger: true,
}).withTypeProvider<ZodTypeProvider>()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(fastifyCookie)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(restaurantRoutes, { prefix: '/restaurant' })

app.register(menuRoutes, { prefix: '/menu' })

app.register(categoriesRoutes, { prefix: '/categories' })

app.register(authRoutes, { prefix: '/auth' })

app.register(userRoutes, { prefix: '/users' })

app.register(plansRoutes, { prefix: '/plans' })

app.register(subscriptionsRoutes, { prefix: '/subscriptions' })

app.register(orderRoutes, { prefix: '/orders' })

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			message: error.message,
			code: error.errorCode,
		})
	}

	// biome-ignore lint/suspicious/noExplicitAny: Error object is heavily dynamic during debugging
	let pgError = error as any

	if (pgError.constructor.name.includes('Drizzle') && pgError.cause) {
		pgError = pgError.cause
	}

	console.log('--- ERROR HANDLER DUMP ---')
	console.log('Final Error instance:', pgError.constructor.name)
	console.log('Final Error code:', pgError.code)

	if (pgError.code === '23505') {
		return reply.status(409).send({
			message: 'A unique constraint was violated.',
			code: 'CONFLICT',
			detail: pgError.detail,
		})
	}

	if (pgError.code === '23503') {
		return reply.status(400).send({
			message:
				'A foreign key constraint was violated. The referenced record does not exist.',
			code: 'BAD_REQUEST',
			detail: pgError.detail,
		})
	}

	return reply.send(error)
})

app.get('/', () => 'Hello World')
