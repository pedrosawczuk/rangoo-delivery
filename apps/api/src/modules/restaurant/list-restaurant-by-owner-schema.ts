import z from 'zod'

export const listRestaurantByOwnerSchema = z.object({
	ownerId: z.uuid(),
})

export type ListRestaurantByOwnerSchema = z.infer<
	typeof listRestaurantByOwnerSchema
>
