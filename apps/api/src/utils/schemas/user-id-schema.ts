import { z } from 'zod'

export const userIdSchema = z.object({
	userId: z.string().uuid('ID de usuário inválido'),
})

export type UserIdSchema = z.infer<typeof userIdSchema>
