import { prismaClient } from "../../prisma";

class ListPlaceService {
    async execute(userId: string) {
        const places = await prismaClient.place.findMany({
            where: {
                userId,
            },
        });
        return places;
    }
}

export { ListPlaceService };
