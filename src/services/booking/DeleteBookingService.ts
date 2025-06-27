import { prismaClient } from "../../prisma";

export class DeleteBookingService {
    async execute(bookingId: string) {
        if (!bookingId) {
            throw new Error("ID da reserva não foi informado.");
        }

        const booking = await prismaClient.booking.findUnique({
            where: {
                id: bookingId,
            },
        });

        if (!booking) {
            throw new Error("Reserva não encontrada.");
        }

        await prismaClient.booking.delete({
            where: {
                id: bookingId,
            },
        });

        return { message: "Reserva cancelada com sucesso." };
    }
}
