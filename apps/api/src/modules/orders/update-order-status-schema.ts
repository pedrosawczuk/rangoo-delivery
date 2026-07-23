import { z } from 'zod'

export const updateOrderStatusSchema = z.object({
	status: z.enum([
		'PENDING_PAYMENT',
		'PREPARING',
		'OUT_FOR_DELIVERY',
		'DELIVERED',
		'CANCELED',
	]),
})

export type UpdateOrderStatusSchema = z.infer<typeof updateOrderStatusSchema>
