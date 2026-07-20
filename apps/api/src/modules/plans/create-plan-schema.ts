import { z } from 'zod'

export const createPlanSchema = z.object({
	name: z.string().trim().min(1, 'Required field').max(255),
	priceInCents: z.number().int().min(0),
	billingCycle: z.enum(['MONTHLY', 'YEARLY']),
	active: z.boolean().default(true),
})

export type CreatePlanSchema = z.infer<typeof createPlanSchema>
