import { z } from 'zod'

export const itemIdSchema = z.object({
	itemId: z.uuid(),
})

export type ItemIdSchema = z.infer<typeof itemIdSchema>
