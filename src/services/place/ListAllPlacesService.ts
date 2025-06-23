import { prismaClient } from "../../prisma";

export class ListAllPlacesService {
    async execute() {
        const places = await prismaClient.place.findMany({
            orderBy: {
                title: "asc"
            },
        });;

        return places;
    }
}