import e, { Request, Response } from "express";
import { DetailPlaceService } from "../../services/place/DetailPlaceService";

class DetailPlaceController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const service = new DetailPlaceService();
            const place = await service.execute({ id });
            return res.json(place);
        } catch (error: any) {
            return res.status(404).json({ message: error.message || "Erro" });
        }
    }
}
export { DetailPlaceController };
