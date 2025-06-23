import { prismaClient } from "../../prisma";

interface PlaceRequest {
    id: string;
}

export class DetailPlaceService {
    async execute({ id }: PlaceRequest) {
        const place = await prismaClient.place.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                city: true,
                photos: true,
                perks: true,
                extras: true,
                description: true,
                price: true,
                checkin: true,
                checkout: true,
                guests: true,
            },
        });

        if (!place) {
            throw new Error("Place não encontrado");
        }

        return place;
    }
}
