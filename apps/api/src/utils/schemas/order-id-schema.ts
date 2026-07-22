import { z } from 'zod'

export const orderIdSchema = z.object({
	orderId: z.uuid('Invalid order ID'),
})

export type OrderIdSchema = z.infer<typeof orderIdSchema>
