import type { FastifyInstance } from 'fastify'
import { paginationQuerySchema } from '../../utils/schemas/pagination-query-schema'
import { planIdSchema } from '../../utils/schemas/plan-id-schema'
import { createPlanModule } from './create-plan'
import { createPlanSchema } from './create-plan-schema'
import { deletePlanModule } from './delete-plan'
import { getPlanModule } from './get-plan'
import { listPlansModule } from './list-plans'
import { updatePlanModule } from './update-plan'
import { updatePlanSchema } from './update-plan-schema'

export function plansRoutes(app: FastifyInstance) {
	app.post(
		'/',
		{ schema: { body: createPlanSchema } },
		createPlanModule,
	)
	app.get(
		'/',
		{ schema: { querystring: paginationQuerySchema } },
		listPlansModule,
	)
	app.get(
		'/:planId',
		{ schema: { params: planIdSchema } },
		getPlanModule,
	)
	app.put(
		'/:planId',
		{ schema: { params: planIdSchema, body: updatePlanSchema } },
		updatePlanModule,
	)
	app.delete(
		'/:planId',
		{ schema: { params: planIdSchema } },
		deletePlanModule,
	)
}
