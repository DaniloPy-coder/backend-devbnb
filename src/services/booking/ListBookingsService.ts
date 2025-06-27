import { prismaClient } from "../../prisma";

export class ListBookingService {
    async getUserBookings(userId: string) {
        const bookings = await prismaClient.booking.findMany({
            where: { userId },
            include: {
                place: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return bookings;
    }
}
