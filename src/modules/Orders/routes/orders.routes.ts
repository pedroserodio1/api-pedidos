import { Router } from "express";
import OrderController from "../controllers/OrderController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticate from "@shared/middleware/isAuthenticate";

const orderRoute = Router();

const orderController = new OrderController();

orderRoute.post('/', celebrate({
    [Segments.BODY]: {
        productsId: Joi.array().required(),
        client: Joi.string().required(),
        status: Joi.string().required(),
        observation: Joi.string()
    }
}), isAuthenticate, orderController.create);

orderRoute.get('/', isAuthenticate, orderController.index);

orderRoute.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required()
    },
    [Segments.BODY]: {
        status: Joi.string().required(),
        observation: Joi.string() 
    }
}), isAuthenticate, orderController.update);

orderRoute.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required()
    }
}), isAuthenticate, orderController.delete);

export default orderRoute