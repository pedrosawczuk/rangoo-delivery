import { z } from 'zod'

export const updateMenuItemSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	isAvailable: z.boolean().optional(),
	isVegetarian: z.boolean().optional(),
	priceInCents: z.coerce.number().nonnegative().optional(),
	discountPriceInCents: z.coerce.number().nonnegative().optional(),
	categoryId: z.uuid('ID da categoria inválido').optional(),
})

export type UpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>
