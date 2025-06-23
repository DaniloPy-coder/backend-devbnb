import { ListPlaceService } from "../../services/place/ListPlaceService";
import { Request, Response } from "express";

export class ListPlaceController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id;

        const listPlaceService = new ListPlaceService();
        const places = await listPlaceService.execute(userId);

        return res.json(places);
    }
}