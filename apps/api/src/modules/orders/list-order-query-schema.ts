import { paginationQuerySchema } from '@/utils/schemas/pagination-query-schema'
import { z } from 'zod'

export const listOrderQuerySchema = paginationQuerySchema.extend({
	status: z
		.enum([
			'PENDING_PAYMENT',
			'PREPARING',
			'OUT_FOR_DELIVERY',
			'DELIVERED',
			'CANCELED',
		])
		.optional(),
})

export type ListOrderQuerySchema = z.infer<typeof listOrderQuerySchema>
