import { z } from 'zod'

export const signUpSchema = z.object({
	firstName: z.string().trim().min(2, 'Minimum 2 characters').max(255),
	lastName: z.string().trim().min(2, 'Minimum 2 characters').max(255),
	email: z.string().trim().email('Invalid email').max(255).toLowerCase(),
	phone: z
		.string()
		.trim()
		.max(255)
		.transform((val) => val.replace(/\D/g, ''))
		.pipe(z.string().min(10, 'Minimum 10 digits').max(50)),
	document: z
		.string()
		.trim()
		.max(255)
		.transform((val) => val.replace(/\D/g, ''))
		.pipe(z.string().min(11, 'Minimum 11 digits').max(50)),
	passwordRaw: z.string().trim().min(12, 'Minimum 12 characters').max(255),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
