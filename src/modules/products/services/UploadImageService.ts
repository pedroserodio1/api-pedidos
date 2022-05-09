import AppError from "@shared/errors/AppError";
import prisma from "@shared/prisma/PrismaClient";
import path from "path";
import uploadConfig from "@config/upload";
import fs from 'fs'

interface IRequest {
    id: string
    filename: string | undefined
}

export default class UploadImageService {
    public async execute({ id, filename }: IRequest){
        const productExists = await prisma.products.findUnique({
            where: {
                id: id
            }
        })

        if(!productExists){
            throw new AppError('Product not found', 404)
        }

        if(productExists.photo){
            const productAvatarFilePath = path.join(uploadConfig.directory, productExists.photo)

            const productAvatarFileExists = await fs.promises.stat(productAvatarFilePath)

            if(productAvatarFileExists){
                await fs.promises.unlink(productAvatarFilePath)
            }
        }

        const product = await prisma.products.update({
            where: {
                id: id
            },
            data: {
                photo: filename
            }
        })


        return product
    }
}
