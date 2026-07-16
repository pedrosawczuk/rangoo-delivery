import z from 'zod'

export const ownerIdSchema = z.object({
	ownerId: z.uuid('Invalid owner ID'),
})

export type OwnerIdSchema = z.infer<typeof ownerIdSchema>
