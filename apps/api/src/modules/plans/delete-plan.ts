import { db, eq, plansTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { PlanIdSchema } from '../../utils/schemas/plan-id-schema'

export async function deletePlanModule(
	request: FastifyRequest<{ Params: PlanIdSchema }>,
	reply: FastifyReply,
) {
	const { planId } = request.params

	const [existingPlan] = await db
		.select({ id: plansTable.id })
		.from(plansTable)
		.where(eq(plansTable.id, planId))

	if (!existingPlan) throw new NotFoundError('Plan not found')

	await db
		.update(plansTable)
		.set({ active: false })
		.where(eq(plansTable.id, planId))

	return reply.status(204).send()
}
