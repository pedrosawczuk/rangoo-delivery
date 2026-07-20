import { z } from 'zod'

export const updateSubscriptionStatusSchema = z.object({
	status: z.enum(['ACTIVE', 'CANCELED', 'PAST_DUE', 'EXPIRED']),
})

export type UpdateSubscriptionStatusSchema = z.infer<
	typeof updateSubscriptionStatusSchema
>
