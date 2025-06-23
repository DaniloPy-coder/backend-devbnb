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

        // Validação básica
        if (!userId || !checkin || !checkout) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Arquivo não encontrado" });
        }

        // Pega nome do arquivo
        const { filename } = req.file;
        const photos = [filename];

        // Garante que 'perks' seja sempre array de strings
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
