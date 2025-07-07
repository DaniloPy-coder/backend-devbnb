import { prismaClient } from "../../prisma";

interface Params {
    checkin?: string;
    checkout?: string;
}

export class ListAllPlacesService {
    async execute({ checkin, checkout }: Params = {}) {
        if (checkin && checkout) {
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);

            const places = await prismaClient.place.findMany({
                where: {
                    bookings: {
                        none: {
                            AND: [
                                { checkin: { lte: checkoutDate } },
                                { checkout: { gte: checkinDate } },
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

        const places = await prismaClient.place.findMany({
            orderBy: {
                title: "asc",
            },
        });

        return places;
    }
}
