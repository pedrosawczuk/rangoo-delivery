import { z } from 'zod'

export const restaurantIdSchema = z.object({
	restaurantId: z.uuid(),
})

export type RestaurantIdSchema = z.infer<typeof restaurantIdSchema>
