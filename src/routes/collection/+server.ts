import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import prismaClient from "$lib/database";

export const GET: RequestHandler = async () => {
    const organizations = await prismaClient.organization.findMany();
    return json(organizations);
};

export const POST: RequestHandler = async ({ request }) => {
    const { open, quests, name, description, owner, ownerId } = await request.json();
    const organization = await prismaClient.organization.create({
        data: {
            open,
            quests,
            name,
            description,
            owner,
            ownerId,
        },
    });
    return json(organization, { status: 201 });
};