import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";

export default class ShowProductService{
    public async execute(id: string){
        const productExistes = await prisma.products.findUnique({
            where: {
                id
            }
        })

        if (!productExistes) {
            throw new AppError("Produto não encontrado", 404);
        }

        return productExistes;
    }
}