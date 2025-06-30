import { prismaClient } from "../../prisma";

interface UpdatePlaceRequest {
    id: string;
    title: string;
    city: string;
    description: string;
    perks: string[] | string;
    extras: string;
    checkin: string;
    checkout: string;
    guests: number;
    price: number;
    photos: string[];
    oldPhotos: string[];
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
        oldPhotos,
    }: UpdatePlaceRequest) {
        const placeExist = await prismaClient.place.findUnique({
            where: { id },
        });

        if (!placeExist) {
            throw new Error("Place não encontrado");
        }

        // Converte perks para array se necessário
        let perksArray: string[] = [];
        if (typeof perks === "string") {
            try {
                perksArray = JSON.parse(perks);
            } catch {
                throw new Error("Perks inválido: não é um JSON válido");
            }
        } else if (Array.isArray(perks)) {
            perksArray = perks;
        }

        // Combina as fotos antigas (que o usuário manteve) com as novas
        const combinedPhotos = [...(oldPhotos || []), ...(photos || [])];

        const updatedPlace = await prismaClient.place.update({
            where: { id },
            data: {
                title,
                city,
                description,
                perks: perksArray,
                extras,
                checkin,
                checkout,
                guests,
                price,
                photos: combinedPhotos,
            },
        });

        return updatedPlace;
    }
}
