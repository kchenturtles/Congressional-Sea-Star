import { json } from "@sveltejs/kit";
import prismaClient from "$lib/database";

export const PATCH = async ({ request, params }) => {
  const collectionId = parseInt(params.collectionId);
  const { open, quests, name, description, owner, ownerId } = await request.json();
  const collection = await prismaClient.collection.update({
    data: {
      open,
      quests: {
        connectOrCreate: quests,
      },
      name,
      description,
      owner,
      ownerId,
    },
    where: {
      id: collectionId,
    },
    include: { quests: { select: { id: true } } },
  });
  return json(collection, { status: 201 });
};

export const DELETE = async ({ params }) => {
  const collectionId = parseInt(params.collectionId);
  await prismaClient.collection.delete({
    where: {
      id: collectionId,
    },
  });
  return json({ success: true });
};
