"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlaceController = void 0;
const CreatePlaceService_1 = require("../../services/place/CreatePlaceService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class CreatePlaceController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, city, checkin, checkout, guests, price, description, extras, perks, } = req.body;
            const userId = req.user_id;
            if (!userId || !title || !city || !checkin || !checkout || !guests || !price) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes" });
            }
            if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
                return res.status(400).json({ error: "Arquivos não encontrados" });
            }
            const files = req.files;
            const photos = [];
            try {
                for (const file of files) {
                    if (!file.path) {
                        return res.status(400).json({ error: "Arquivo temporário não encontrado" });
                    }
                    const uploadResult = yield cloudinary_1.v2.uploader.upload(file.path, {
                        folder: "places",
                    });
                    photos.push(uploadResult.secure_url);
                }
            }
            catch (uploadError) {
                console.error("Erro no upload do Cloudinary:", uploadError);
                return res.status(500).json({ error: "Erro ao enviar imagens" });
            }
            let formattedPerks = [];
            if (typeof perks === "string") {
                try {
                    const parsed = JSON.parse(perks);
                    formattedPerks = Array.isArray(parsed) ? parsed : [parsed];
                }
                catch (_a) {
                    formattedPerks = [perks];
                }
            }
            else if (Array.isArray(perks)) {
                formattedPerks = perks;
            }
            else {
                formattedPerks = [];
            }
            try {
                const createPlaceService = new CreatePlaceService_1.CreatePlaceService();
                const place = yield createPlaceService.execute({
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
            }
            catch (error) {
                return res.status(500).json({
                    error: error.message || "Erro ao criar o local",
                    stack: error.stack,
                });
            }
        });
    }
}
exports.CreatePlaceController = CreatePlaceController;
