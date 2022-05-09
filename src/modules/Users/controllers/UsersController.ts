import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUsersService from "../services/ListUsersService";
import UpdateUserService from "../services/UpdateUserService";

export default class UsersController{
    public async index(req: Request, res: Response): Promise<Response> {

        const listUsersService = new ListUsersService()

        const users = await listUsersService.execute()

        return res.status(200).json(users)
        
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const createUserService = new CreateUserService()

        const { name, username, password } = req.body

        const user = await createUserService.execute({
            name,
            username,
            password
        })

        return res.status(201).json(user)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const updateUserService = new UpdateUserService()

        const { id } = req.params
        const { name, username } = req.body

        const user = await updateUserService.execute({ id, name, username })

        return res.status(200).json(user)
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const deleteUserService = new DeleteUserService()

        const { id } = req.params

        const user = await deleteUserService.execute(id)

        return res.status(200).json(user)
    }
}