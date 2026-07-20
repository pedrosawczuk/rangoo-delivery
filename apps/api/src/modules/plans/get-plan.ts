import { db, eq, plansTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../core/errors'
import type { PlanIdSchema } from '../../utils/schemas/plan-id-schema'

export async function getPlanModule(
	request: FastifyRequest<{ Params: PlanIdSchema }>,
	reply: FastifyReply,
) {
	const { planId } = request.params

	const [plan] = await db
		.select()
		.from(plansTable)
		.where(eq(plansTable.id, planId))

	if (!plan) throw new NotFoundError('Plan not found')

	return reply.status(200).send(plan)
}
