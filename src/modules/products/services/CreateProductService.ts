import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";


export default class CreateProductService{
    public async execute(data: any){

        const productExist = await prisma.products.findFirst({
            where: {
                name: data.name
            }
        })

        if(productExist){
            throw new AppError("Produto já existe", 400)
        }

        const product = await prisma.products.create({
            data: data
        })

        return product
    }
}