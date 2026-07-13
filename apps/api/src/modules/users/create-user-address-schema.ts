import { z } from 'zod'

export const createUserAddressSchema = z.object({
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
	isDefault: z.boolean().default(false),
	type: z.enum(['WORK', 'HOME']).optional(),
})

export type CreateUserAddressSchema = z.infer<typeof createUserAddressSchema>
