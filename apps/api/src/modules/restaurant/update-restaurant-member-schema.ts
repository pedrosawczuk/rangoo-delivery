import z from 'zod'

export const updateRestaurantMemberSchema = z.object({
	role: z.enum(['OWNER', 'MANAGER', 'DELIVERY_DRIVER', 'STAFF']),
})

export type UpdateRestaurantMemberSchema = z.infer<
	typeof updateRestaurantMemberSchema
>
