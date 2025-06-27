import { Request, Response } from "express";
import { DeleteBookingService } from "../../services/booking/DeleteBookingService";

class DeleteBookingController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const service = new DeleteBookingService();

        try {
            const result = await service.execute(id);
            return res.json(result);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

export { DeleteBookingController };
