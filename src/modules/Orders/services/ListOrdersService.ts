import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";

export default class ListOrderService {
    public async execute() {
        const orders = await prisma.orders.findMany()

        if(orders.length === 0 ){
            throw new AppError('Nenhum pedido encontrado', 404)
        }

        return orders

    }
}