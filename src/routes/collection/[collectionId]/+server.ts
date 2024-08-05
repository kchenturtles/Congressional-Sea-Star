import { json } from "@sveltejs/kit";
import prismaClient from "$lib/database";

export const PATCH = async ({ request, params }) => {
    const organizationId = parseInt(params.organizationId);
    const { open, quests, name, description, owner, ownerId } = await request.json()
    const organization = await prismaClient.organization.update({
        data: {
            open,
            quests,
            name,
            description,
            owner,
            ownerId,
        },
        where: {
            id: organizationId,
        },
    });
    return json(organization, { status: 201 });
};

export const DELETE = async ({ params }) => {
    const organizationId = parseInt(params.roleId);
    await prismaClient.organization.delete({
        where: {
            id: organizationId,
        },
    });
    return json({ success: true });
};