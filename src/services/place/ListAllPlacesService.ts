import { prismaClient } from "../../prisma";

export class ListAllPlacesService {
    async execute() {
        const hoje = new Date();

        const places = await prismaClient.place.findMany({
            where: {
                bookings: {
                    none: {
                        AND: [
                            { checkin: { lte: hoje } },
                            { checkout: { gte: hoje } },
                        ],
                    },
                },
            },
            orderBy: {
                title: "asc",
            },
        });

        return places;
    }
}
