import prisma from "@shared/prisma/PrismaClient";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    username: string;
}

export default class UpdateUserService {
  public async execute({ id, name, username }: IRequest) {
    const userExistes = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (!userExistes) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        name,
        username
      },
    });

    return user;
  }
}
