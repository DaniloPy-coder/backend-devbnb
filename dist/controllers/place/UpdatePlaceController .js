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
exports.UpdatePlaceController = void 0;
const UpdatePlaceService_1 = require("../../services/place/UpdatePlaceService");
class UpdatePlaceController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, city, description, perks, extras, checkin, checkout, guests, price, oldPhotos, } = req.body;
            // Validação dos campos numéricos
            const guestsNum = Number(guests);
            const priceNum = Number(price);
            if (isNaN(guestsNum) || isNaN(priceNum)) {
                return res.status(400).json({
                    message: "Guests ou Price inválidos",
                });
            }
            // Parsing seguro de oldPhotos que pode ser string ou array
            let oldPhotosParsed = [];
            if (oldPhotos) {
                if (typeof oldPhotos === "string") {
                    oldPhotosParsed = [oldPhotos];
                }
                else if (Array.isArray(oldPhotos)) {
                    oldPhotosParsed = oldPhotos;
                }
                else {
                    return res.status(400).json({
                        message: "oldPhotos inválido: formato inesperado",
                    });
                }
            }
            // Processar novas fotos enviadas pelo multer (req.files)
            let photos = [];
            if (req.files && Array.isArray(req.files)) {
                photos = req.files.map(file => file.filename);
            }
            try {
                const updatePlaceService = new UpdatePlaceService_1.UpdatePlaceService();
                const place = yield updatePlaceService.execute({
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
            }
            catch (error) {
                return res.status(400).json({
                    message: error.message || "Erro ao atualizar place",
                });
            }
        });
    }
}
exports.UpdatePlaceController = UpdatePlaceController;
