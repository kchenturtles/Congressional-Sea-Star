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
  const { name, description, circles, ownerId, completion } = await request.json();
  const quest = await prismaClient.quest.create({
    data: {
      name,
      description,
      circles: { connectOrCreate: circles },
      ownerId,
      completion,
    },
    include: { circles: { select: { id: true } } },
  });
  return json(quest, { status: 201 });
};
