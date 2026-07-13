import { z } from 'zod'

export const addressIdSchema = z.object({
	addressId: z.uuid('Invalid address ID'),
})

export type AddressIdSchema = z.infer<typeof addressIdSchema>
