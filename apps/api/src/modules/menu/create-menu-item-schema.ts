import { z } from 'zod'

export const createMenuItemSchema = z.object({
	name: z.string(),
	description: z.string(),
	isAvailable: z.boolean(),
	isVegetarian: z.boolean(),
	priceInCents: z.coerce.number().nonnegative().default(0),
	discountPriceInCents: z.coerce.number().nonnegative().optional().default(0),
	categoryId: z.uuid('ID da categoria inválido'),
})

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>
