import AppError from '@shared/errors/AppError'
import prisma from '@shared/prisma/PrismaClient'



export default class ListUsersService {
    public async execute() {      
        const users = await prisma.users.findMany()

        if(users.length === 0) {
            throw new AppError('Não foi possível encontrar usuários', 404)
        }

        return users
    }   
}