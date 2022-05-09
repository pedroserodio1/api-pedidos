import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";

export default class UpdateProductsService {
    public async execute(id: string, data: any) {
        const productExistes = await prisma.products.findFirst({
            where: {
                id: id
            }
        })
    
        if (!productExistes) {
            throw new AppError("Produto não encontrado", 404);
        }

        const product = await prisma.products.update({
            where: {
                id: id
            },
            data: data
        })

        return product;
    }
}
