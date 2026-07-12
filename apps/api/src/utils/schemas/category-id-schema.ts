import { z } from 'zod'

export const categoryIdSchema = z.object({
	categoryId: z.uuid('Invalid category ID'),
})

export type CategoryIdSchema = z.infer<typeof categoryIdSchema>
