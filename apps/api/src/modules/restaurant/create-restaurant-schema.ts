import { z } from 'zod'

export const createNewRestaurantSchema = z.object({
	name: z.string().trim().min(1, 'Required field').max(255),
	phone: z
		.string()
		.trim()
		.max(255)
		.transform((val) => val.replace(/\D/g, ''))
		.pipe(z.string().min(1, 'Required field').max(50)),
	description: z.string().trim().min(1, 'Required field').max(2000),
	categoryId: z.uuid('Invalid category ID'),
	ownerId: z.uuid('Invalid owner ID'),
	street: z.string().trim().min(1, 'Required field').max(255),
	streetNumber: z.string().trim().min(1, 'Required field').max(50),
	complement: z.string().trim().max(255).optional(),
	neighborhood: z.string().trim().min(1, 'Required field').max(255),
	city: z.string().trim().min(1, 'Required field').max(255),
	state: z.string().trim().min(1, 'Required field').max(50),
	zipCode: z
		.string()
		.trim()
		.max(255)
		.transform((val) => val.replace(/\D/g, ''))
		.pipe(z.string().min(1, 'Required field').max(20)),
	document: z
		.string()
		.trim()
		.max(255)
		.transform((val) => val.replace(/\D/g, ''))
		.pipe(z.string().min(1, 'Required field').max(50)),
})

export type CreateNewRestaurantSchema = z.infer<
	typeof createNewRestaurantSchema
>
