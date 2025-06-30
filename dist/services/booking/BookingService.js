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
exports.BookingService = void 0;
const prisma_1 = require("../../prisma");
class BookingService {
    createBooking(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const place = yield prisma_1.prismaClient.place.findUnique({
                where: { id: data.placeId },
            });
            if (!place) {
                throw new Error("Local não encontrado.");
            }
            const days = Math.ceil((data.checkout.getTime() - data.checkin.getTime()) / (1000 * 60 * 60 * 24));
            if (days <= 0) {
                throw new Error("Check-out deve ser após check-in.");
            }
            const daily = days;
            const pricePerDay = place.price;
            const total = daily * pricePerDay;
            const booking = yield prisma_1.prismaClient.booking.create({
                data: {
                    checkin: data.checkin,
                    checkout: data.checkout,
                    guests: data.guests,
                    price: pricePerDay,
                    daily,
                    total,
                    user: { connect: { id: data.userId } },
                    place: { connect: { id: data.placeId } },
                },
            });
            return booking;
        });
    }
    getUserBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield prisma_1.prismaClient.booking.findMany({
                where: { userId },
                include: { place: true },
                orderBy: { createdAt: "desc" },
            });
            return bookings;
        });
    }
    getBookingById(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield prisma_1.prismaClient.booking.findUnique({
                where: { id: bookingId },
                include: { place: true, user: true },
            });
            if (!booking) {
                throw new Error("Reserva não encontrada.");
            }
            return booking;
        });
    }
    cancelBooking(_a) {
        return __awaiter(this, arguments, void 0, function* ({ bookingId, userId }) {
            const booking = yield prisma_1.prismaClient.booking.findUnique({
                where: { id: bookingId },
            });
            if (!booking) {
                throw new Error("Reserva não encontrada.");
            }
            if (booking.userId !== userId) {
                throw new Error("Você não tem permissão para cancelar esta reserva.");
            }
            yield prisma_1.prismaClient.booking.delete({
                where: { id: bookingId },
            });
            return { message: "Reserva cancelada com sucesso." };
        });
    }
}
exports.BookingService = BookingService;
