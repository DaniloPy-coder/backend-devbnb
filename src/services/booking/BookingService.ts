import { prismaClient } from "../../prisma";

interface CreateBookingRequest {
    userId: string;
    placeId: string;
    checkin: Date;
    checkout: Date;
    guests: number;
}

interface CancelBookingRequest {
    bookingId: string;
    userId: string;
}

export class BookingService {
    async createBooking(data: CreateBookingRequest) {

        const place = await prismaClient.place.findUnique({
            where: { id: data.placeId },
        });

        if (!place) {
            throw new Error("Local não encontrado.");
        }

        const days = Math.ceil(
            (data.checkout.getTime() - data.checkin.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (days <= 0) {
            throw new Error("Check-out deve ser após check-in.");
        }

        const daily = days;
        const pricePerDay = place.price;
        const total = daily * pricePerDay;

        const booking = await prismaClient.booking.create({
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
    }

    async getUserBookings(userId: string) {
        const bookings = await prismaClient.booking.findMany({
            where: { userId },
            include: { place: true },
            orderBy: { createdAt: "desc" },
        });

        return bookings;
    }

    async getBookingById(bookingId: string) {
        const booking = await prismaClient.booking.findUnique({
            where: { id: bookingId },
            include: { place: true, user: true },
        });

        if (!booking) {
            throw new Error("Reserva não encontrada.");
        }

        return booking;
    }

    async cancelBooking({ bookingId, userId }: CancelBookingRequest) {
        const booking = await prismaClient.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new Error("Reserva não encontrada.");
        }

        if (booking.userId !== userId) {
            throw new Error("Você não tem permissão para cancelar esta reserva.");
        }

        await prismaClient.booking.delete({
            where: { id: bookingId },
        });

        return { message: "Reserva cancelada com sucesso." };
    }
}
