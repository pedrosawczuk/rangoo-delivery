import {
	db,
	productCategoriesTable,
	productsTable,
	restaurantCategoriesTable,
} from '@rangoo/database'
import { makeMenuItem } from '@rangoo/database/src/tests/factories/make-menu-item'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('POST /:restaurantId', () => {
	it('should create new product and return 201', async () => {
		const restaurant = await makeRestaurant()
		const product = await makeMenuItem({ restaurantId: restaurant.id })

		const response = await app.inject({
			method: 'POST',
			url: `/menu/${restaurant.id}`,
			payload: product,
		})

		if (response.statusCode !== 201) {
			console.error(`Debug Error: ${response.json()}`)
		}

		expect(response.statusCode).toBe(201)
	})
})
