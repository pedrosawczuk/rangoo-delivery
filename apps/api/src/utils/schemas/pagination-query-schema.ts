import { z } from 'zod'

export const paginationQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().min(1).max(100).default(10),
})

export type PaginationQuerySchema = z.infer<typeof paginationQuerySchema>
