import { z } from 'zod'

export const subscriptionIdSchema = z.object({
	subscriptionId: z.uuid('Invalid subscription ID'),
})

export type SubscriptionIdSchema = z.infer<typeof subscriptionIdSchema>
