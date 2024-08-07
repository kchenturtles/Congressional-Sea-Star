import type { RequestHandler } from "@sveltejs/kit";
import prismaClient from "$lib/database";
import { json } from "@sveltejs/kit";

export const GET = async () => {
  const questTemplates = await prismaClient.questTemplate.findMany({
    orderBy: { name: "asc" },
  });
  return json(questTemplates);
};

export const POST: RequestHandler = async ({ request }) => {
  const { open, name, description, circles, ownerId, collections } = await request.json();
  const questTemplate = await prismaClient.questTemplate.create({
    data: {
      open,
      name,
      description,
      circles: { connectOrCreate: circles },
      ownerId,
      collections,
    },
    include: { circles: { select: { id: true } } },
  });
  return json(questTemplate, { status: 201 });
};
