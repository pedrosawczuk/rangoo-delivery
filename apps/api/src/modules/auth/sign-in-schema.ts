import { z } from 'zod'

export const signInSchema = z.object({
	email: z.email('Invalid email').max(255).trim().toLowerCase(),
	password: z.string().trim().min(1, 'Required field'),
})

export type SignInSchema = z.infer<typeof signInSchema>
