import type { FastifyInstance } from 'fastify'
import { categoryIdSchema } from '../../utils/schemas/category-id-schema'
import { createCategorySchema } from '../../utils/schemas/create-category-schema'
import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import { createProductCategoryModule } from './product/create-product-category'
import { deleteProductCategoryModule } from './product/delete-product-category'
import { getProductCategoryModule } from './product/get-product-category'
import { listProductCategoriesModule } from './product/list-product-categories'
import { updateProductCategoryModule } from './product/update-product-category'
import { createRestaurantCategoryModule } from './restaurant/create-restaurant-category'
import { deleteRestaurantCategoryModule } from './restaurant/delete-restaurant-category'
import { getRestaurantCategoryModule } from './restaurant/get-restaurant-category'
import { listRestaurantCategoriesModule } from './restaurant/list-restaurant-categories'
import { updateRestaurantCategoryModule } from './restaurant/update-restaurant-category'

export function categoriesRoutes(app: FastifyInstance) {
	// Restaurant Categories
	app.post(
		'/restaurant',
		{ schema: { body: createCategorySchema } },
		createRestaurantCategoryModule,
	)
	app.get(
		'/restaurant',
		{ schema: { querystring: paginationQuerySchema } },
		listRestaurantCategoriesModule,
	)
	app.get(
		'/restaurant/:categoryId',
		{ schema: { params: categoryIdSchema } },
		getRestaurantCategoryModule,
	)
	app.put(
		'/restaurant/:categoryId',
		{ schema: { body: createCategorySchema, params: categoryIdSchema } },
		updateRestaurantCategoryModule,
	)
	app.delete(
		'/restaurant/:categoryId',
		{ schema: { params: categoryIdSchema } },
		deleteRestaurantCategoryModule,
	)

	// Product Categories
	app.post(
		'/product',
		{ schema: { body: createCategorySchema } },
		createProductCategoryModule,
	)
	app.get(
		'/product',
		{ schema: { querystring: paginationQuerySchema } },
		listProductCategoriesModule,
	)
	app.get(
		'/product/:categoryId',
		{ schema: { params: categoryIdSchema } },
		getProductCategoryModule,
	)
	app.put(
		'/product/:categoryId',
		{ schema: { body: createCategorySchema, params: categoryIdSchema } },
		updateProductCategoryModule,
	)
	app.delete(
		'/product/:categoryId',
		{ schema: { params: categoryIdSchema } },
		deleteProductCategoryModule,
	)
}
