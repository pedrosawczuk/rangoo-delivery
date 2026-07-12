import { z } from 'zod'

export const itemIdSchema = z.object({
	itemId: z.uuid('Invalid item ID'),
})

export type ItemIdSchema = z.infer<typeof itemIdSchema>
