import type { FastifyInstance } from 'fastify'
import { signUpModule } from './sign-up'
import { signUpSchema } from './sign-up-schema'

import { signInModule } from './sign-in'
import { signInSchema } from './sign-in-schema'

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

	app.post(
		'/sign-in',
		{
			schema: {
				body: signInSchema,
			},
		},
		signInModule,
	)
}
