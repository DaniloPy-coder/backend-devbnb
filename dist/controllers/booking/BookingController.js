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
exports.BookingController = void 0;
const BookingService_1 = require("../../services/booking/BookingService");
class BookingController {
    constructor() {
        this.bookingService = new BookingService_1.BookingService();
        this.handle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, placeId, checkin, checkout, guests } = req.body;
                if (!userId || !placeId || !checkin || !checkout || !guests) {
                    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
                }
                const booking = yield this.bookingService.createBooking({
                    userId,
                    placeId,
                    checkin: new Date(checkin),
                    checkout: new Date(checkout),
                    guests: Number(guests),
                });
                return res.status(201).json(booking);
            }
            catch (error) {
                return res.status(500).json({ error: error.message || "Erro ao criar reserva" });
            }
        });
    }
}
exports.BookingController = BookingController;
