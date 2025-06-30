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
exports.CreatePlaceService = void 0;
const prisma_1 = require("../../prisma");
class CreatePlaceService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, city, checkin, checkout, guests, price, description, extras, perks, photos, userId, }) {
            try {
                const place = yield prisma_1.prismaClient.place.create({
                    data: {
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
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                });
                return place;
            }
            catch (error) {
                console.error("Erro ao criar place no Service:", error);
                throw error;
            }
        });
    }
}
exports.CreatePlaceService = CreatePlaceService;
