import type { FastifyInstance } from 'fastify'
import { signUpModule } from './sign-up'
import { signUpSchema } from './sign-up-schema'

export function authRoutes(app: FastifyInstance) {
	app.post(
		'/sign-up',
		{
			schema: {
				body: signUpSchema,
			},
		},
		signUpModule,
	)
}
