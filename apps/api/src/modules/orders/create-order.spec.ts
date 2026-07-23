import { faker } from '@faker-js/faker'
import { db, orderItemsTable, ordersTable } from '@rangoo/database'
import { makeMenuItem } from '@rangoo/database/src/tests/factories/make-menu-item'
import { makeRestaurant } from '@rangoo/database/src/tests/factories/make-restaurant'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { makeUserAddress } from '@rangoo/database/src/tests/factories/make-user-address'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('POST /orders', () => {
	it('should create an order with PICKUP delivery method and return 201', async () => {
		const user = await makeUser()
		const restaurant = await makeRestaurant()
		const product = await makeMenuItem({ restaurantId: restaurant.id })

		const payload = {
			restaurantId: restaurant.id,
			userId: user.id,
			status: 'PENDING_PAYMENT',
			deliveryMethod: 'PICKUP',
			totalPriceInCents: product.priceInCents * 2,
			items: [
				{
					productId: product.id,
					quantity: 2,
				},
			],
		}

		const response = await app.inject({
			method: 'POST',
			url: '/orders',
			payload,
		})

		expect(response.statusCode).toBe(201)

		const [order] = await db
			.select()
			.from(ordersTable)
			.where(eq(ordersTable.userId, user.id))

		expect(order).toBeDefined()
		expect(order.restaurantId).toBe(restaurant.id)
		expect(order.deliveryMethod).toBe('PICKUP')
		expect(order.status).toBe('PENDING_PAYMENT')

		const orderItems = await db
			.select()
			.from(orderItemsTable)
			.where(eq(orderItemsTable.orderId, order.id))

		expect(orderItems).toHaveLength(1)
		expect(orderItems[0].productId).toBe(product.id)
		expect(orderItems[0].quantity).toBe(2)
		expect(orderItems[0].unitPriceInCents).toBe(product.priceInCents)
	})

	it('should create an order with DELIVERY method and return 201', async () => {
		const user = await makeUser()
		const address = await makeUserAddress({ userId: user.id })
		const restaurant = await makeRestaurant()
		const product = await makeMenuItem({ restaurantId: restaurant.id })

		const payload = {
			restaurantId: restaurant.id,
			userId: user.id,
			deliveryAddressId: address.id,
			status: 'PENDING_PAYMENT',
			deliveryMethod: 'DELIVERY',
			totalPriceInCents: product.priceInCents,
			items: [
				{
					productId: product.id,
					quantity: 1,
				},
			],
		}

		const response = await app.inject({
			method: 'POST',
			url: '/orders',
			payload,
		})

		expect(response.statusCode).toBe(201)

		const [order] = await db
			.select()
			.from(ordersTable)
			.where(eq(ordersTable.userId, user.id))

		expect(order.deliveryAddressId).toBe(address.id)
	})

	it('should return 404 if user does not exist', async () => {
		const restaurant = await makeRestaurant()
		const product = await makeMenuItem({ restaurantId: restaurant.id })

		const payload = {
			restaurantId: restaurant.id,
			userId: faker.string.uuid(),
			status: 'PENDING_PAYMENT',
			deliveryMethod: 'PICKUP',
			totalPriceInCents: product.priceInCents,
			items: [{ productId: product.id, quantity: 1 }],
		}

		const response = await app.inject({
			method: 'POST',
			url: '/orders',
			payload,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 404 if delivery address does not exist', async () => {
		const user = await makeUser()
		const restaurant = await makeRestaurant()
		const product = await makeMenuItem({ restaurantId: restaurant.id })

		const payload = {
			restaurantId: restaurant.id,
			userId: user.id,
			deliveryAddressId: faker.string.uuid(),
			status: 'PENDING_PAYMENT',
			deliveryMethod: 'DELIVERY',
			totalPriceInCents: product.priceInCents,
			items: [{ productId: product.id, quantity: 1 }],
		}

		const response = await app.inject({
			method: 'POST',
			url: '/orders',
			payload,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 404 if one or more products do not exist', async () => {
		const user = await makeUser()
		const restaurant = await makeRestaurant()
		const product = await makeMenuItem({ restaurantId: restaurant.id })

		const payload = {
			restaurantId: restaurant.id,
			userId: user.id,
			status: 'PENDING_PAYMENT',
			deliveryMethod: 'PICKUP',
			totalPriceInCents: product.priceInCents,
			items: [
				{ productId: product.id, quantity: 1 },
				{ productId: faker.string.uuid(), quantity: 1 },
			],
		}

		const response = await app.inject({
			method: 'POST',
			url: '/orders',
			payload,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 400 if items array is empty', async () => {
		const user = await makeUser()
		const restaurant = await makeRestaurant()

		const payload = {
			restaurantId: restaurant.id,
			userId: user.id,
			status: 'PENDING_PAYMENT',
			deliveryMethod: 'PICKUP',
			totalPriceInCents: 1000,
			items: [],
		}

		const response = await app.inject({
			method: 'POST',
			url: '/orders',
			payload,
		})

		expect(response.statusCode).toBe(400)
	})

	it('should return 400 if total price is negative', async () => {
		const user = await makeUser()
		const restaurant = await makeRestaurant()
		const product = await makeMenuItem({ restaurantId: restaurant.id })

		const payload = {
			restaurantId: restaurant.id,
			userId: user.id,
			status: 'PENDING_PAYMENT',
			deliveryMethod: 'PICKUP',
			totalPriceInCents: -50,
			items: [{ productId: product.id, quantity: 1 }],
		}

		const response = await app.inject({
			method: 'POST',
			url: '/orders',
			payload,
		})

		expect(response.statusCode).toBe(400)
	})
})
