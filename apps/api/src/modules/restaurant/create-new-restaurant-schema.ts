import { z } from 'zod'

export const createNewRestaurantSchema = z.object({
	name: z.string().trim().min(1, 'O nome é obrigatório').max(255),
	phone: z
		.string()
		.trim()
		.min(1, 'O telefone é obrigatório')
		.max(50)
		.transform((val) => val.replace(/\D/g, '')),
	description: z.string().trim().min(1).max(2000),
	ownerId: z.uuid('ID do dono inválido'),
	street: z.string().trim().min(1).max(255),
	streetNumber: z.string().trim().min(1).max(50),
	complement: z.string().trim().max(255).optional(),
	neighborhood: z.string().trim().min(1).max(255),
	city: z.string().trim().min(1).max(255),
	state: z.string().trim().min(1).max(50),
	zipCode: z
		.string()
		.trim()
		.min(1)
		.max(20)
		.transform((val) => val.replace(/\D/g, '')),
	document: z
		.string()
		.trim()
		.min(1, 'O documento é obrigatório')
		.max(50)
		.transform((val) => val.replace(/\D/g, '')),
})

export type CreateNewRestaurantSchema = z.infer<
	typeof createNewRestaurantSchema
>
