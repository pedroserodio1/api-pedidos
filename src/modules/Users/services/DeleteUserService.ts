import prisma from '@shared/prisma/PrismaClient'
import AppError from '@shared/errors/AppError'

export default class DeleteUserService {
    public async execute(id: string) {
        const userExistes = await prisma.users.findFirst({
            where: {
                id: id
            }
        })

        if (!userExistes) {
            throw new AppError("Usuário não encontrado", 404);
        }

        const user = await prisma.users.delete({
            where: {
                id: id
            }
        })

        return user;
    }
}