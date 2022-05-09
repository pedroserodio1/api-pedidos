import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductsService from "../services/ListProductsService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductsService from "../services/UpdateProductService";

export default class ProductController{
    public async create(req: Request, res: Response): Promise<Response> {
        const createProductService = new CreateProductService()

        const product = await createProductService.execute(req.body)

        return res.status(201).json(product)
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listProductsService = new ListProductsService()

        const products = await listProductsService.execute()

        return res.status(200).json(products)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const updateProductService = new UpdateProductsService()

        const { id } = req.params

        const product = await updateProductService.execute(id, req.body)

        return res.status(200).json(product)
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const deleteProductService = new DeleteProductService()

        const { id } = req.params

        const product = await deleteProductService.execute(id)

        return res.status(200).json(product)
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const showProductService = new ShowProductService()

        const { id } = req.params

        const product = await showProductService.execute(id)

        console.log(req.user)

        return res.status(200).json(product)
    }

}