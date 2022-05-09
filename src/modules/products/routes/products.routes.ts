import { Router } from 'express'
import ProductController from '../controllers/ProductController'
import { celebrate, Joi, Segments} from 'celebrate'
import isAuthenticate from '@shared/middleware/isAuthenticate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UploadImageController from '../controllers/UploadImageController';

const productRouter = Router();
const productController = new ProductController()
const uploadImageController = new UploadImageController()

const upload = multer(uploadConfig);

productRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        status: Joi.string().required(),
        description: Joi.string().required()
    }
}), isAuthenticate, productController.create)

productRouter.get('/', isAuthenticate, productController.index)

productRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required()
    },
    [Segments.BODY]: {
        name: Joi.string(),
        price: Joi.number().precision(2),
        status: Joi.string(),
        description: Joi.string()
    }
}), isAuthenticate, productController.update)

productRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required()
    }
}), isAuthenticate, productController.delete)

productRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required()
    }
}), isAuthenticate, productController.show)

productRouter.patch('/:id', isAuthenticate, upload.single('photo'), uploadImageController.update)



export default productRouter