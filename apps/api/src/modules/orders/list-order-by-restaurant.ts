import { NotFoundError } from "@/core/errors";
import { RestaurantIdSchema } from "@/utils/schemas/restaurant-id-schema";
import { db, eq, inArray, orderItemsTable, ordersTable, restaurantTable } from "@rangoo/database";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listOrderByRestaurantModule(request: FastifyRequest<{Params: RestaurantIdSchema}>, reply: FastifyReply) {
    const {restaurantId} = request.params

    const [restaurant] = await db.select().from(restaurantTable).where(eq(restaurantTable.id, restaurantId))

    if (!restaurant) {
        throw new NotFoundError('Restaurant not found')
    }

    const restaurantOrders = await db.select().from(ordersTable).where(eq(ordersTable.restaurantId, restaurantId))

    const ordersId = restaurantOrders.map((orderId) => orderId.id)

    const [orderItems] = await db.select().from(orderItemsTable).where(inArray(orderItemsTable.id, ordersId))

    return reply.status(200).send({
        data: {restaurantOrders, item: orderItems},
    })

}