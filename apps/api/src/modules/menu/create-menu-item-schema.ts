import { z } from 'zod'

export const createMenuItemSchema = z.object({
	name: z.string().trim().min(1, 'Required field').max(255),
	description: z.string().trim().min(1, 'Required field').max(2000),
	isAvailable: z.boolean(),
	isVegetarian: z.boolean(),
	priceInCents: z.coerce.number().nonnegative().default(0),
	discountPriceInCents: z.coerce.number().nonnegative().optional().default(0),
	categoryId: z.uuid('Invalid category ID'),
})

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>
