import { Request, Response } from "express";
import { UpdatePlaceService } from "../../services/place/UpdatePlaceService";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

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

        const guestsNum = Number(guests);
        const priceNum = Number(price);

        if (isNaN(guestsNum) || isNaN(priceNum)) {
            return res.status(400).json({
                message: "Guests ou Price inválidos",
            });
        }

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

        let photos: string[] = [];
        if (req.files && Array.isArray(req.files)) {
            try {
                for (const file of req.files as Express.Multer.File[]) {
                    const url = await new Promise<string>((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            { folder: "places" },
                            (error, result) => {
                                if (error) return reject(error);
                                if (result?.secure_url) {
                                    resolve(result.secure_url);
                                } else {
                                    reject(new Error("Upload falhou sem URL"));
                                }
                            }
                        );

                        streamifier.createReadStream(file.buffer).pipe(uploadStream);
                    });

                    photos.push(url);
                }
            } catch (uploadError) {
                console.error("Erro no upload do Cloudinary:", uploadError);
                return res.status(500).json({ error: "Erro ao enviar imagens" });
            }
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
