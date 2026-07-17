import { z } from 'zod'

export const planIdSchema = z.object({
	planId: z.uuid('Invalid plan ID'),
})

export type PlanIdSchema = z.infer<typeof planIdSchema>
