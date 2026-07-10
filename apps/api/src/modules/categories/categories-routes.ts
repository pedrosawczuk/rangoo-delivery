import type { FastifyInstance } from 'fastify'
import { createCategorySchema } from '../../utils/schemas/create-category-schema'
import { createProductCategoryModule } from './product/create-product-category'
import { createRestaurantCategoryModule } from './restaurant/create-restaurant-category'

export function categoriesRoutes(app: FastifyInstance) {
	app.post(
		'/restaurant',
		{
			schema: { body: createCategorySchema },
		},
		createRestaurantCategoryModule,
	)
	app.post(
		'/product',
		{
			schema: { body: createCategorySchema },
		},
		createProductCategoryModule,
	)
}
