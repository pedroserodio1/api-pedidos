import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/authConfig";
import prisma from "@shared/prisma/PrismaClient";

interface IUser{
    id: string;
    name: string;
    username: string;
    password: string;
}

interface IRequest{
    username: string;
    password: string;
}

interface IResponse{
    user: IUser
    token: string
}

export default class CreateSessionService {
    public async execute({ username, password }: IRequest): Promise<IResponse> {
        const user = await prisma.users.findFirst({
            where:{
                username: username
            }
        })

        if(!user){
            throw new AppError("Username não encontrado", 404)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Senha incorreta", 401)
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn 
        });

        return {
            user,
            token
        }
    }
}