import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { AppError } from './core/errors/app-error'
import { categoriesRoutes } from './modules/categories/categories-routes'
import { menuRoutes } from './modules/menu/menu-routes'
import { restaurantRoutes } from './modules/restaurant/restaurant-routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(restaurantRoutes, { prefix: '/restaurant' })

app.register(menuRoutes, { prefix: '/menu' })

app.register(categoriesRoutes, { prefix: '/categories' })

app.setErrorHandler((error, request, reply) => {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			message: error.message,
			code: error.errorCode,
		})
	}

	return reply.send(error)
})

app.get('/', () => 'Hello World')
