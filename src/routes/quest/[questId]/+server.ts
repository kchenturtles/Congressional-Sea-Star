import prismaClient from "$lib/database";
import { json, error } from "@sveltejs/kit";

export const GET = async ({ params }) => {
    const questId = parseInt(params.questId);
    const quest = await prismaClient.quest.findUnique({
        where: {
            id: questId,
        }, include: { circles: { select: { id: true } } },
    });
    if (!quest) {
        return error(404, "quest not found");
    }
    return json(quest);
};

export const PATCH = async ({ params, request }) => {
    const questId = parseInt(params.questId);
    const { name, description, circles, owner, ownerId, completion } = await request.json();
    const quest = await prismaClient.quest.findUnique({
        where: {
            id: questId,
        },
    });
    if (!quest) {
        return error(404, "quest not found");
    }
    const updatedQuest = await prismaClient.quest.update({
        data: {
            name,
            description,
            circles: {connectOrCreate: circles},
            owner,
            ownerId,
            completion,
        },
        where: {
            id: questId,
        }, include: { circles: { select: { id: true } } },
    });
    return json(updatedQuest, { status: 201 });
};

export const DELETE = async ({ params }) => {
    const questId = parseInt(params.questId);
    const quest = await prismaClient.quest.findUnique({
        where: {
            id: questId,
        },
    });
    if (!quest) {
        return error(404, "quest not found");
    }
    await prismaClient.quest.delete({
        where: {
            id: questId,
        },
    });
    return json({ success: true });
};