import { Request, Response } from "express";
import { CreatePlaceService } from "../../services/place/CreatePlaceService";

class CreatePlaceController {
    async handle(req: Request, res: Response) {
        console.log("req.user_id:", req.user_id);
        console.log("req.body:", req.body);

        const {
            title,
            city,
            checkin,
            checkout,
            guests,
            price,
            description,
            extras,
            perks,
            photos,
        } = req.body;

        const userId = req.user_id;

        if (!userId || !title || !city || !checkin || !checkout || !guests || !price) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes" });
        }

        let formattedPhotos: string[] = [];

        if (!photos) {
            return res.status(400).json({ error: "URLs das fotos são obrigatórias" });
        }

        if (typeof photos === "string") {
            try {
                const parsed = JSON.parse(photos);
                formattedPhotos = Array.isArray(parsed) ? parsed : [parsed];
            } catch {
                formattedPhotos = [photos];
            }
        } else if (Array.isArray(photos)) {
            formattedPhotos = photos;
        }

        if (formattedPhotos.length === 0) {
            return res.status(400).json({ error: "URLs das fotos são obrigatórias" });
        }

        // Parse perks
        let formattedPerks: string[] = [];

        if (typeof perks === "string") {
            try {
                const parsed = JSON.parse(perks);
                formattedPerks = Array.isArray(parsed) ? parsed : [parsed];
            } catch {
                formattedPerks = [perks];
            }
        } else if (Array.isArray(perks)) {
            formattedPerks = perks;
        }

        try {
            const createPlaceService = new CreatePlaceService();

            const place = await createPlaceService.execute({
                title,
                city,
                checkin,
                checkout,
                guests: Number(guests),
                price: Number(price),
                description,
                extras,
                perks: formattedPerks,
                photos: formattedPhotos,
                userId,
            });

            return res.status(201).json(place);
        } catch (error: any) {
            console.error("Erro ao criar place:", error);
            return res.status(500).json({
                error: error.message || "Erro ao criar o local",
                stack: error.stack,
            });
        }
    }
}

export { CreatePlaceController };
