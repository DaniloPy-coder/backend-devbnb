import { prismaClient } from "../../prisma";

interface ListAllPlacesRequest {
    checkin?: string;
    checkout?: string;
}

export class ListAllPlacesService {
    async execute({ checkin, checkout }: ListAllPlacesRequest = {}) {
        if (!checkin || !checkout) {
            return await prismaClient.place.findMany({
                orderBy: { title: "asc" },
            });
        }

        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        const places = await prismaClient.place.findMany({
            orderBy: { title: "asc" },
            where: {
                NOT: {
                    bookings: {
                        some: {
                            AND: [
                                { checkin: { lte: checkoutDate } },
                                { checkout: { gte: checkinDate } },
                            ],
                        },
                    },
                },
            },
        });

        return places;
    }
}
