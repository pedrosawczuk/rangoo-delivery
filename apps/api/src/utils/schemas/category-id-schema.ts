import { z } from 'zod'

export const categoryIdSchema = z.object({
	categoryId: z.uuid('ID da categoria inválido'),
})

export type CategoryIdSchema = z.infer<typeof categoryIdSchema>
