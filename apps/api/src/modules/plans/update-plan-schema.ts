import { z } from 'zod'
import { createPlanSchema } from './create-plan-schema'

export const updatePlanSchema = createPlanSchema.partial()

export type UpdatePlanSchema = z.infer<typeof updatePlanSchema>
