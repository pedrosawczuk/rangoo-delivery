import { z } from 'zod'

export const createNewRestaurantSchema = z.object({
	id: z.uuidv7(),
	name: z.string(),
	phone: z.string(),
	description: z.string(),
	ownerId: z.uuidv7(),
	street: z.string(),
	streetNumber: z.string(),
	complement: z.string(),
	neighborhood: z.string(),
	city: z.string(),
	state: z.string(),
	zipCode: z.string(),
	document: z.string(),
})

export type CreateNewRestaurantSchema = z.infer<
	typeof createNewRestaurantSchema
>
