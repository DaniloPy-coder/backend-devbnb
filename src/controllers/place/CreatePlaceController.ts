import { Request, Response } from "express";
import { CreatePlaceService } from "../../services/place/CreatePlaceService";

class CreatePlaceController {
    async handle(req: Request, res: Response) {
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
        } = req.body;

        const userId = req.user_id;

        if (!userId || !checkin || !checkout) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes" });
        }

        if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
            return res.status(400).json({ error: "Arquivos não encontrados" });
        }

        // Pega nomes dos arquivos
        const files = req.files as Express.Multer.File[];
        const photos = files.map(file => file.filename);

        // Processa perks como array
        let formattedPerks: string[] = [];
        try {
            const parsed = JSON.parse(perks);
            formattedPerks = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            formattedPerks = [perks];
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
                photos,
                userId,
            });

            return res.status(201).json(place);
        } catch (error: any) {
            console.error("Erro detalhado:", error);
            return res.status(500).json({
                error: error.message || "Erro ao criar o local",
                stack: error.stack,
            });
        }
    }
}

export { CreatePlaceController };
