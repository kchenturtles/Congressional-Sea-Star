import { json, error } from "@sveltejs/kit";
import prismaClient from "$lib/database";

export const GET = async ({ params }) => {
  const collectionId = parseInt(params.collectionId);
  const collection = await prismaClient.collection.findUnique({
    where: {
      id: collectionId,
    },
    include: { quests: { select: { id: true } } },
  });
  return json(collection);
};

export const PATCH = async ({ request, params }) => {
  const collectionId = parseInt(params.collectionId);
  const collection = await prismaClient.collection.findUnique({
    where: {
      id: collectionId,
    },
  });
  if (!collection) {
    return error(404, "Collection not found");
  }
  const { open, quests, name, description, owner, ownerId } = await request.json();
  const updatedCollection = await prismaClient.collection.update({
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
  return json(updatedCollection, { status: 201 });
};

export const DELETE = async ({ params }) => {
  const collectionId = parseInt(params.collectionId);
  const collection = await prismaClient.collection.findUnique({
    where: {
      id: collectionId,
    },
  });
  if (!collection) {
    return error(404, "Collection not found");
  }
  await prismaClient.collection.delete({
    where: {
      id: collectionId,
    },
  });
  return json({ success: true });
};
