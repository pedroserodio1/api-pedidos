import { Request, Response } from 'express'
import CreateSessionService from '../services/CreateSessionService'

export default class SessionController {
    public async create(req: Request, res: Response): Promise<Response> {
        const createSessionService = new CreateSessionService()

        const { username, password } = req.body

        const session = await createSessionService.execute({username, password})

        return res.status(201).json(session)
    }
}