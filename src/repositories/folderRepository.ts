import { prisma } from "@/lib/prisma.js";

export const findFoldersByUserId = async (userId: number) => {
  const folders = await prisma.folder.findMany({
    where: { userId: userId },
  });
  return folders;
};

export const existFolderNameByUserId = async (
  folderName: string,
  userId: number,
) => {
  const folder = await prisma.folder.findFirst({
    where: { userId: userId, name: folderName },
  });
  return folder !== null;
};

export const createFolderWithUserId = async (
  folderName: string,
  userId: number,
) => {
  await prisma.folder.create({
    data: {
      name: folderName,
      user: {
        connect: { id: userId },
      },
    },
  });
};
