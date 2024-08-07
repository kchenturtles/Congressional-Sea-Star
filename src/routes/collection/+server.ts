import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import prismaClient from "$lib/database";

export const GET: RequestHandler = async () => {
  const collections = await prismaClient.collection.findMany();
  return json(collections);
};

export const POST: RequestHandler = async ({ request }) => {
  const { open, quests, name, description, ownerId } = await request.json();
  const collection = await prismaClient.collection.create({
    data: {
      open,
      quests: {
        connectOrCreate: quests,
      },
      name,
      description,
      ownerId,
    },
    include: { quests: { select: { id: true } } },
  });
  return json(collection, { status: 201 });
};
