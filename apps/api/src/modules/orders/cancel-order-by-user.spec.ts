import { faker } from '@faker-js/faker'
import { db, eq, ordersTable } from '@rangoo/database'
import { makeOrder } from '@rangoo/database/src/tests/factories/make-order'
import { makeUser } from '@rangoo/database/src/tests/factories/make-user'
import { describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('PATCH /users/:userId/orders/:orderId/cancel', () => {
	it('should return 204 and cancel a pending order', async () => {
		const user = await makeUser()
		const order = await makeOrder({
			userId: user.id,
			status: 'PENDING_PAYMENT',
		})

		const response = await app.inject({
			method: 'PATCH',
			url: `/users/${user.id}/orders/${order.id}/cancel`,
		})

		expect(response.statusCode).toBe(204)

		const [updatedOrder] = await db
			.select()
			.from(ordersTable)
			.where(eq(ordersTable.id, order.id))

		expect(updatedOrder.status).toBe('CANCELED')
	})

	it('should return 409 if order is already out for delivery', async () => {
		const user = await makeUser()
		const order = await makeOrder({
			userId: user.id,
			status: 'OUT_FOR_DELIVERY',
		})

		const response = await app.inject({
			method: 'PATCH',
			url: `/users/${user.id}/orders/${order.id}/cancel`,
		})

		expect(response.statusCode).toBe(409)
	})

	it('should return 409 if order is already delivered', async () => {
		const user = await makeUser()
		const order = await makeOrder({
			userId: user.id,
			status: 'DELIVERED',
		})

		const response = await app.inject({
			method: 'PATCH',
			url: `/users/${user.id}/orders/${order.id}/cancel`,
		})

		expect(response.statusCode).toBe(409)
	})

	it('should return 404 if trying to cancel an order from another user', async () => {
		const maliciousUser = await makeUser()
		const victimUser = await makeUser()

		const order = await makeOrder({
			userId: victimUser.id,
			status: 'PENDING_PAYMENT',
		})

		const response = await app.inject({
			method: 'PATCH',
			url: `/users/${maliciousUser.id}/orders/${order.id}/cancel`,
		})

		expect(response.statusCode).toBe(404)
	})

	it('should return 404 if order does not exist', async () => {
		const user = await makeUser()

		const response = await app.inject({
			method: 'PATCH',
			url: `/users/${user.id}/orders/${faker.string.uuid()}/cancel`,
		})

		expect(response.statusCode).toBe(404)
	})
})
