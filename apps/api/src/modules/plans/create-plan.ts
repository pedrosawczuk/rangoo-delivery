import { db, plansTable } from '@rangoo/database'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreatePlanSchema } from './create-plan-schema'

export async function createPlanModule(
	request: FastifyRequest<{ Body: CreatePlanSchema }>,
	reply: FastifyReply,
) {
	const { name, priceInCents, billingCycle, active } = request.body

	const [plan] = await db
		.insert(plansTable)
		.values({
			name,
			priceInCents,
			billingCycle,
			active,
		})
		.returning({ id: plansTable.id })

	return reply.status(201).send({ id: plan.id })
}
