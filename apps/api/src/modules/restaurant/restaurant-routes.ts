import type { FastifyInstance } from 'fastify'
import { createNewRestaurantModule } from './create-new-restaurant'

export function restaurantRoutes(app: FastifyInstance) {
	app.post('/create', createNewRestaurantModule)
}
