import { prismaClient } from "../../prisma";

interface UpdatePlaceRequest {
    id: string;
    title: string;
    city: string;
    description: string;
    perks: string[];
    extras: string;
    checkin: string;
    checkout: string;
    guests: number;
    price: number;
    photos: string[];
}

export class UpdatePlaceService {
    async execute({
        id,
        title,
        city,
        description,
        perks,
        extras,
        checkin,
        checkout,
        guests,
        price,
        photos,
    }: UpdatePlaceRequest) {
        const placeExist = await prismaClient.place.findUnique({
            where: { id },
        });

        if (!placeExist) {
            throw new Error("Place não encontrado");
        }

        // Se perks for string, converte para array
        let perksArray: string[] = [];
        if (typeof perks === "string") {
            try {
                perksArray = JSON.parse(perks);
            } catch {
                perksArray = [];
            }
        } else if (Array.isArray(perks)) {
            perksArray = perks;
        }

        const updatedPlace = await prismaClient.place.update({
            where: { id },
            data: {
                title,
                city,
                description,
                perks: perksArray,  // usa o array parseado
                extras,
                checkin,
                checkout,
                guests,
                price,
                photos: photos || placeExist.photos,
            },
        });

        return updatedPlace;
    }
}
