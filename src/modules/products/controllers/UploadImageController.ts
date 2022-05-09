import { Request, Response } from "express";
import UploadImageService from "../services/UploadImageService";

export default class UploadImageController{
    public async update(req: Request, res: Response): Promise<Response> {
        const uploadImageService = new UploadImageService()

        const { id } = req.params
        const filename = req.file?.filename

        const product = await uploadImageService.execute({id, filename})

        return res.status(200).json(product)
    }
}