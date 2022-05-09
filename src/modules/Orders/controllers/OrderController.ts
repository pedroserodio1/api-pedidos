import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import DeleteOrderService from "../services/DeleteOrderService";
import ListOrderService from "../services/ListOrdersService";
import UpdateOrderService from "../services/UpdateOrderService";

export default class OrderController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { productsId, client, status, observation } = req.body;

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({productsId, client, status, observation, userChange: req.user.id});

        return res.status(201).json(order);
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listOrder = new ListOrderService();

        const orders = await listOrder.execute();

        return res.status(200).json(orders);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const updateOrderService = new UpdateOrderService();

        const { id } = req.params

        const order = await updateOrderService.execute({id, data: req.body, userChange: req.user.id});

        return res.status(200).json(order);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteOrder = new DeleteOrderService();

        const order = await deleteOrder.execute(id);

        return res.status(200).json(order);
    }
}