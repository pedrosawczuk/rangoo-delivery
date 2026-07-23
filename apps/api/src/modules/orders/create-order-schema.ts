import z from 'zod'

export const createOrderSchema = z.object({

	restaurantId: z.uuid(),
	deliveryAddressId: z.uuid().optional(),
	userId: z.uuid(),
	status: z.enum([
		'PENDING_PAYMENT',
		'PREPARING',
		'OUT_FOR_DELIVERY',
		'DELIVERED',
		'CANCELED',
	]),
	deliveryMethod: z.enum(['DELIVERY', 'PICKUP']),
	totalPriceInCents: z.number().int().nonnegative(),
	items: z
		.array(
			z.object({
				productId: z.uuid(),
				quantity: z.number().int().min(1),
			}),
		)
		.min(1),
})

export type CreateOrderSchema = z.infer<typeof createOrderSchema>
