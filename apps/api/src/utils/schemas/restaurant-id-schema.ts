import { z } from 'zod'

export const restaurantIdSchema = z.object({
	restaurantId: z.uuid('Invalid restaurant ID'),
})

export type RestaurantIdSchema = z.infer<typeof restaurantIdSchema>
