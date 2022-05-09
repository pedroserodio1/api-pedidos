import { Router } from 'express'
import SessionController from '../controllers/SessionController'
import {celebrate, Joi, Segments} from 'celebrate'

const sessionRouter = Router();
const sessionController = new SessionController()


sessionRouter.post('/', celebrate({
    [Segments.BODY]: {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
}), sessionController.create)



export default sessionRouter

