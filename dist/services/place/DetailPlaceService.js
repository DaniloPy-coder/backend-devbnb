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
exports.DetailPlaceService = void 0;
const prisma_1 = require("../../prisma");
class DetailPlaceService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const place = yield prisma_1.prismaClient.place.findUnique({
                where: { id },
                select: {
                    id: true,
                    title: true,
                    city: true,
                    photos: true,
                    perks: true,
                    extras: true,
                    description: true,
                    price: true,
                    checkin: true,
                    checkout: true,
                    guests: true,
                },
            });
            if (!place) {
                throw new Error("Place não encontrado");
            }
            return place;
        });
    }
}
exports.DetailPlaceService = DetailPlaceService;
