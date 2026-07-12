import { z } from 'zod'

export const updateMenuItemSchema = z.object({
	name: z.string().trim().min(1, 'Required field').max(255).optional(),
	description: z.string().trim().min(1, 'Required field').max(2000).optional(),
	isAvailable: z.boolean().optional(),
	isVegetarian: z.boolean().optional(),
	priceInCents: z.coerce.number().nonnegative().optional(),
	discountPriceInCents: z.coerce.number().nonnegative().optional(),
	categoryId: z.uuid('Invalid category ID').optional(),
})

export type UpdateMenuItemSchema = z.infer<typeof updateMenuItemSchema>
