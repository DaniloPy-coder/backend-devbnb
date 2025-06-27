import { Request, Response } from "express";
import { BookingService } from "../../services/booking/BookingService";

class BookingController {
    private bookingService = new BookingService();

    handle = async (req: Request, res: Response) => {
        try {
            const { userId, placeId, checkin, checkout, guests } = req.body;

            if (!userId || !placeId || !checkin || !checkout || !guests) {
                return res.status(400).json({ error: "Campos obrigatórios ausentes" });
            }

            const booking = await this.bookingService.createBooking({
                userId,
                placeId,
                checkin: new Date(checkin),
                checkout: new Date(checkout),
                guests: Number(guests),
            });

            return res.status(201).json(booking);
        } catch (error: any) {
            return res.status(500).json({ error: error.message || "Erro ao criar reserva" });
        }
    };
}
export { BookingController };
