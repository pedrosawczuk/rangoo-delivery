import z from 'zod'

export const listRestaurantByOwnerSchema = z.object({
	ownerId: z.uuid('Invalid owner ID'),
})

export type ListRestaurantByOwnerSchema = z.infer<
	typeof listRestaurantByOwnerSchema
>
