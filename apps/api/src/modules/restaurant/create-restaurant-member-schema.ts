import z from 'zod'

export const createRestaurantMemberSchema = z.object({
	role: z.enum(['OWNER', 'MANAGER', 'DELIVERY_DRIVER', 'STAFF']),
})

export type CreateRestaurantMemberSchema = z.infer<
	typeof createRestaurantMemberSchema
>
