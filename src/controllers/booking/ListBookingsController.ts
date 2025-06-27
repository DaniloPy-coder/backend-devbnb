import { Request, Response } from "express";
import { ListBookingService } from "../../services/booking/ListBookingsService";

class ListBookingsController {
    private bookingService = new ListBookingService();

    handle = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: "userId é obrigatório." });
            }

            const bookings = await this.bookingService.getUserBookings(userId);

            return res.status(200).json(bookings);
        } catch (error: any) {
            return res.status(500).json({ error: error.message || "Erro ao listar reservas." });
        }
    };
}

export { ListBookingsController };
