import type { RequestHandler } from "@sveltejs/kit";
import prismaClient from "$lib/database";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    const questTemplates = await prismaClient.questTemplate.findMany({
        orderBy: { date: "asc" },
    });
    return json(questTemplates);
};

export const POST: RequestHandler = async ({ request }) => {
    const { open, name, description, circles, owner, ownerId, collections } = await request.json();
    const questTemplate = await prismaClient.questTemplate.create({
        data: {
            open,
            name,
            description,
            circles,
            owner,
            ownerId,
            collections,
        },
    });
    return json(questTemplate, { status: 201 });
};