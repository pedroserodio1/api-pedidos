import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";

interface IRequest {
    id: string,
    data: any,
    userChange: string,
}

export default class UpdateOrderService {
    public async execute({id, data, userChange}: IRequest) {

        const orderExists = await prisma.orders.findUnique({
            where: {
                id
            }
        })

        if(!orderExists){
            throw new AppError('Pedido não encontrado', 404)
        }

        const order = await prisma.orders.update({
            where: {
                id
            },
            data: {
                ...data,
                userChange: userChange
            }
        })

        return order

    }   
}