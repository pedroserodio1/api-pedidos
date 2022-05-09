import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";

export default class ListProductsService {
    public async execute() {
        const products = await prisma.products.findMany()
        
        if(products.length === 0){
            throw new AppError("Nenhum produto encontrado", 404)
        }

        return products
    }
}