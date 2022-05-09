import { Router } from 'express'
import userRouter from '@modules/Users/routes/users.routes';
import sessionRouter from '@modules/Users/routes/session.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/session', sessionRouter);

routes.get('/', (req, res) => {
    res.json({
        message: 'Bem vindo ao sistema de pedidos',
        version: '1.0.0',
        author: 'Pedro Serôdio',
        contact: {
            'email': 'serodiomg@gmail.com',
            'github': 'https://github.com/pedroserodio1',
            'linkedin': 'https://www.linkedin.com/in/pedroserodio1',
            'twitter': 'https://twitter.com/pedroserodio'
        }
    })
})

export default routes;