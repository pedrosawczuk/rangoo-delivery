import { env } from '@rangoo/env'
import { app } from './app'

app
	.listen({ port: env.PORT, host: '0.0.0.0' })
	.then(() =>
		console.log(`HTTP server running on http://localhost:${env.PORT}`),
	)
	.catch((err) => {
		console.log('Error', err)
		process.exit(1)
	})
