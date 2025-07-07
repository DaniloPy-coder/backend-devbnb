import { prismaClient } from "../../prisma";

interface Params {
    checkin?: string;
    checkout?: string;
}

export class ListAllPlacesService {
    async execute({ checkin, checkout }: Params = {}) {
        if (checkin && checkout) {
            const places = await prismaClient.place.findMany({
                where: {
                    bookings: {
                        none: {
                            OR: [
                                {
                                    checkin: { lte: checkout },
                                    checkout: { gte: checkin },
                                },
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
