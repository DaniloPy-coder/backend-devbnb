import { Request, Response } from "express";
import { UploadService } from "../../services/place/UploadPhotoService";

class UploadPhotoController {
    async handle(req: Request, res: Response) {
        if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
            return res.status(400).json({ error: "Arquivos não encontrados" });
        }

        const files = req.files as Express.Multer.File[];
        const uploadService = new UploadService();

        try {
            const uploadedUrls = await uploadService.uploadFiles(files);
            return res.json({ files: uploadedUrls });
        } catch (err) {
            console.error("Erro no upload do Cloudinary:", err);
            return res.status(500).json({ error: "Erro ao enviar imagens" });
        }
    }
}

export { UploadPhotoController };
