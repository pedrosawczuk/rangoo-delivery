import { z } from 'zod'

export const signUpSchema = z.object({
	firstName: z.string().trim().min(2, 'Minimum 2 characters'),
	lastName: z.string().trim().min(2, 'Minimum 2 characters'),
	email: z.string().trim().email('Invalid email address'),
	phone: z.string().trim().min(14, 'Enter a valid phone number'),
	document: z.string().trim().min(14, 'Enter a valid CPF'),
	passwordRaw: z.string().trim().min(12, 'Minimum 12 characters'),
})

export type SignUpFormData = z.infer<typeof signUpSchema>
