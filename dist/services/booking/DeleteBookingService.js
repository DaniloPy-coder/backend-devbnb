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
exports.DeleteBookingService = void 0;
const prisma_1 = require("../../prisma");
class DeleteBookingService {
    execute(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bookingId) {
                throw new Error("ID da reserva não foi informado.");
            }
            const booking = yield prisma_1.prismaClient.booking.findUnique({
                where: {
                    id: bookingId,
                },
            });
            if (!booking) {
                throw new Error("Reserva não encontrada.");
            }
            yield prisma_1.prismaClient.booking.delete({
                where: {
                    id: bookingId,
                },
            });
            return { message: "Reserva cancelada com sucesso." };
        });
    }
}
exports.DeleteBookingService = DeleteBookingService;
