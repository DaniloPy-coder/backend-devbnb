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
exports.ListBookingsController = void 0;
const ListBookingsService_1 = require("../../services/booking/ListBookingsService");
class ListBookingsController {
    constructor() {
        this.bookingService = new ListBookingsService_1.ListBookingService();
        this.handle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                if (!userId) {
                    return res.status(400).json({ error: "userId é obrigatório." });
                }
                const bookings = yield this.bookingService.getUserBookings(userId);
                return res.status(200).json(bookings);
            }
            catch (error) {
                return res.status(500).json({ error: error.message || "Erro ao listar reservas." });
            }
        });
    }
}
exports.ListBookingsController = ListBookingsController;
