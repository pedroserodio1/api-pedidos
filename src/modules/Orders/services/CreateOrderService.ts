import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";

interface IRequest {
    productsId: string,
    client: string,
    status: string,
    observation: string,
    userChange: string,
}

export default class CreateOrderService {
    public async execute({productsId, client, status, observation, userChange}: IRequest) {

        const order = await prisma.orders.create({
            data: {
                productsId,
                client,
                status,
                observation,
                userChange
            }
        })

        return order
    }
}