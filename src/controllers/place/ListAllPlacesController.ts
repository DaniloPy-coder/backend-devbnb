import { Request, Response } from "express";
import { ListAllPlacesService } from "../../services/place/ListAllPlacesService";

class ListAllPlacesController {
    async handle(req: Request, res: Response) {
        try {
            const service = new ListAllPlacesService();
            const places = await service.execute();
            return res.json(places);
        } catch (error) {
            console.error("Erro ao listar os places:", error);
            return res.status(500).json({ error: "Erro ao buscar os lugares" });
        }
    }
}

export { ListAllPlacesController };
