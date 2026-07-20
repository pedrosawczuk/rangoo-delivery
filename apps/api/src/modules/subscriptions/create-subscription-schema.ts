import { z } from 'zod'

export const createSubscriptionSchema = z.object({
	userId: z.uuid('Invalid user ID'),
	planId: z.uuid('Invalid plan ID'),
})

export type CreateSubscriptionSchema = z.infer<typeof createSubscriptionSchema>
