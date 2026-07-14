import { z } from 'zod'

export const updateUserAddressSchema = z.object({
	street: z.string().trim().max(255).optional(),
	streetNumber: z.string().trim().max(50).optional(),
	complement: z.string().trim().max(255).optional().optional(),
	neighborhood: z.string().trim().max(255).optional(),
	city: z.string().trim().max(255).optional(),
	state: z.string().trim().max(50).optional(),
	zipCode: z
		.string()
		.trim()
		.max(255)
		.transform((val) => val.replace(/\D/g, ''))
		.pipe(z.string().max(20))
		.optional(),
	isDefault: z.boolean().optional(),
	type: z.enum(['WORK', 'HOME']).optional(),
})

export type UpdateUserAddressSchema = z.infer<typeof updateUserAddressSchema>
