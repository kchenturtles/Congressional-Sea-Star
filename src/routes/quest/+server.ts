import type { RequestHandler } from "@sveltejs/kit";
import prismaClient from "$lib/database";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    const quests = await prismaClient.quest.findMany({
        orderBy: { name: "asc" },
    });
    return json(quests);
};

export const POST: RequestHandler = async ({ request }) => {
    const { name, description, circles, owner, ownerId, completion } = await request.json();
    const quest = await prismaClient.quest.create({
        data: {
            open,
            description,
            circles,
            owner,
            ownerId,
            completion,
        },
    });
    return json(quest, { status: 201 });
};