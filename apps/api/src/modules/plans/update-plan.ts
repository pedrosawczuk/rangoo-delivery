import { db, eq, plansTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { PlanIdSchema } from '../../utils/schemas/plan-id-schema'
import type { UpdatePlanSchema } from './update-plan-schema'

export async function updatePlanModule(
	request: FastifyRequest<{ Params: PlanIdSchema; Body: UpdatePlanSchema }>,
	reply: FastifyReply,
) {
	const { planId } = request.params
	const dataToUpdate = request.body

	const [existingPlan] = await db
		.select({ id: plansTable.id })
		.from(plansTable)
		.where(eq(plansTable.id, planId))

	if (!existingPlan) throw new NotFoundError('Plan not found')

	if (Object.keys(dataToUpdate).length > 0) {
		await db
			.update(plansTable)
			.set(dataToUpdate)
			.where(eq(plansTable.id, planId))
	}

	return reply.status(204).send()
}
