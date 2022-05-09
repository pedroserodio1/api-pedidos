import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticate from '@shared/middleware/isAuthenticate';

const userRouter = Router();
const usersController = new UsersController()

userRouter.get('/', isAuthenticate , usersController.index)

userRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }
}), isAuthenticate , usersController.create)

userRouter.patch('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required().uuid()
    },
    [Segments.BODY]: {
        name: Joi.string(),
        username: Joi.string()
    }
}), isAuthenticate , usersController.update)

userRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required().uuid()
    }
}), isAuthenticate , usersController.delete)

export default userRouter

