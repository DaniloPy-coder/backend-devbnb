import { prismaClient } from "../../prisma";

interface PlaceRequest {
    title: string;
    city: string;
    checkin: string;
    checkout: string;
    guests: number;
    price: number;
    description: string;
    extras: string;
    perks: string[];
    photos: string[];
    userId: string;
}

class CreatePlaceService {
    async execute({
        title,
        city,
        checkin,
        checkout,
        guests,
        price,
        description,
        extras,
        perks,
        photos,
        userId,
    }: PlaceRequest) {
        const place = await prismaClient.place.create({
            data: {
                title,
                city,
                checkin,
                checkout,
                guests,
                price,
                description,
                extras,
                perks,
                photos,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return place;
    }

}

export { CreatePlaceService };
