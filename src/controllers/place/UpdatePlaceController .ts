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


        // Validação dos campos numéricos
        const guestsNum = Number(guests);
        const priceNum = Number(price);

        if (isNaN(guestsNum) || isNaN(priceNum)) {
            return res.status(400).json({
                message: "Guests ou Price inválidos",
            });
        }

        // Parsing seguro de oldPhotos que pode ser string ou array
        let oldPhotosParsed: string[] = [];
        if (oldPhotos) {
            if (typeof oldPhotos === "string") {
                oldPhotosParsed = [oldPhotos];
            } else if (Array.isArray(oldPhotos)) {
                oldPhotosParsed = oldPhotos;
            } else {
                return res.status(400).json({
                    message: "oldPhotos inválido: formato inesperado",
                });
            }
        }

        // Processar novas fotos enviadas pelo multer (req.files)
        let photos: string[] = [];
        if (req.files && Array.isArray(req.files)) {
            photos = req.files.map(file => file.filename);
        }

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
                guests: guestsNum,
                price: priceNum,
                photos,
                oldPhotos: oldPhotosParsed,
            });

            return res.json(place);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Erro ao atualizar place",
            });
        }
    }
}

export { UpdatePlaceController };
