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
exports.UpdatePlaceService = void 0;
const prisma_1 = require("../../prisma");
class UpdatePlaceService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, title, city, description, perks, extras, checkin, checkout, guests, price, photos, oldPhotos, }) {
            const placeExist = yield prisma_1.prismaClient.place.findUnique({
                where: { id },
            });
            if (!placeExist) {
                throw new Error("Place não encontrado");
            }
            // Converte perks para array se necessário
            let perksArray = [];
            if (typeof perks === "string") {
                try {
                    perksArray = JSON.parse(perks);
                }
                catch (_b) {
                    throw new Error("Perks inválido: não é um JSON válido");
                }
            }
            else if (Array.isArray(perks)) {
                perksArray = perks;
            }
            // Combina as fotos antigas (que o usuário manteve) com as novas
            const combinedPhotos = [...(oldPhotos || []), ...(photos || [])];
            const updatedPlace = yield prisma_1.prismaClient.place.update({
                where: { id },
                data: {
                    title,
                    city,
                    description,
                    perks: perksArray,
                    extras,
                    checkin,
                    checkout,
                    guests,
                    price,
                    photos: combinedPhotos,
                },
            });
            return updatedPlace;
        });
    }
}
exports.UpdatePlaceService = UpdatePlaceService;
