import { Request, Response } from "express";
import { CreatePlaceService } from "../../services/place/CreatePlaceService";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

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

        if (!userId || !title || !city || !checkin || !checkout || !guests || !price) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes" });
        }

        if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
            return res.status(400).json({ error: "Arquivos não encontrados" });
        }

        const files = req.files as Express.Multer.File[];

        const photos: string[] = [];

        try {
            for (const file of files) {
                if (!file.path) {
                    return res.status(400).json({ error: "Arquivo temporário não encontrado" });
                }

                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: "places",
                });
                photos.push(uploadResult.secure_url);
            }
        } catch (uploadError) {
            console.error("Erro no upload do Cloudinary:", uploadError);
            return res.status(500).json({ error: "Erro ao enviar imagens" });
        }

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
        } else {
            formattedPerks = [];
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
            return res.status(500).json({
                error: error.message || "Erro ao criar o local",
                stack: error.stack,
            });
        }
    }
}

export { CreatePlaceController };
