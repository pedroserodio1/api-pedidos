import prisma from '@shared/prisma/PrismaClient'
import AppError from '@shared/errors/AppError'

export default class DeleteProductService {
    public async execute(id: string) {
        const productExistes = await prisma.products.findFirst({
            where: {
                id: id
            }
        })

        if (!productExistes) {
            throw new AppError("Usuário não encontrado", 404);
        }

        const product = await prisma.products.delete({
            where: {
                id: id
            }
        })

        return product;
    }
}