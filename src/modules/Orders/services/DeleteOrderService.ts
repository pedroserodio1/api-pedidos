import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";

export default class DeleteOrderService {
    public async execute(id: string) {
            
            const orderExists = await prisma.orders.findUnique({
                where: {
                    id
                }
            })

            if(!orderExists){
                throw new AppError('Pedido não encontrado', 404)
            }

            await prisma.orders.delete({
                where: {
                    id
                }
            })

            return {
                message: 'Pedido deletado com sucesso',
                pedido: orderExists,
            }
    }
}