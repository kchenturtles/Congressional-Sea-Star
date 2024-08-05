import prismaClient from "$lib/database";
import { json } from "@sveltejs/kit";


export const GET = async () => {
    const users = await prismaClient.user.findMany();
    return json(users);
};

export const POST = async ({ request }) => {
    const { email, quests, questTemplates, username, collections } = await request.json();
    const user = await prismaClient.user.create({
        data: {
            email,
            quests,
            questTemplates,
            username,
            collections,
        },
    });
    return json(user, { status: 201 });
};