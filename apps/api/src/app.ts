import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { restaurantRoutes } from './modules/restaurant/restaurant-routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(restaurantRoutes, { prefix: '/restaurant' })

app.get('/', () => 'Hello World')
