import prisma from '@shared/prisma/PrismaClient'
import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'

interface IRequest{
    name: string;
    username: string;
    password: string;
}

export default class CreateUserService {
    public async execute({name, username, password}: IRequest){

        const userExistes = await prisma.users.findFirst({
            where: {
                username: username
            }
        })

        if(userExistes){
            throw new AppError('Usuário já existe', 400)
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.users.create({
            data:{
                name: name,
                username: username,
                password: hashedPassword
            }
        })

        return user


    }
}