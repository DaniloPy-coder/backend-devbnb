import { Request, Response } from "express";
import { UpdatePlaceService } from "../../services/place/UpdatePlaceService";

class UpdatePlaceController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const {
            title,
            city,
            description,
            perks,
            extras,
            checkin,
            checkout,
            guests,
            price,
            oldPhotos,
        } = req.body;

        const files = req.files as Express.Multer.File[];
        const photos = files?.map((file) => file.filename) || [];

        try {
            const updatePlaceService = new UpdatePlaceService();

            const place = await updatePlaceService.execute({
                id,
                title,
                city,
                description,
                perks,
                extras,
                checkin,
                checkout,
                guests: Number(guests),
                price: Number(price),
                photos,
                oldPhotos: oldPhotos ? JSON.parse(oldPhotos) : [], // oldPhotos vem como string no FormData
            });

            return res.json(place);
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({
                message: error.message || "Erro ao atualizar place",
            });
        }
    }
}

export { UpdatePlaceController };
