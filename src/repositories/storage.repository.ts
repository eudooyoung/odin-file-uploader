import { prisma } from "@/lib/prisma.js";
import type { FileInput } from "@/types/storage.types.js";

export const findFoldersByUserId = async (userId: number) => {
  const folders = await prisma.folder.findMany({
    where: { userId: userId },
    orderBy: { id: "asc" },
  });
  return folders;
};

export const existsFolderNameByUserId = async (
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
  const { id } = await prisma.folder.create({
    data: {
      name: folderName,
      user: {
        connect: { id: userId },
      },
    },
    select: {
      id: true,
    },
  });
  return id;
};

export const findFolderByIdAndUserId = async (
  folderId: number,
  userId: number,
) => {
  const folder = await prisma.folder.findUniqueOrThrow({
    where: { id: folderId, userId: userId },
    include: { files: true },
  });
  return folder;
};

export const updateFolderByIdAndUserId = async (
  folderId: number,
  folderName: string,
  userId: number,
) => {
  await prisma.folder.update({
    data: {
      name: folderName,
    },
    where: {
      id: folderId,
      userId,
    },
  });
};

export const existsFolderNameByUserIdExcludingId = async (
  folderName: string,
  userId: number,
  folderId: number,
) => {
  const folder = await prisma.folder.findFirst({
    where: {
      name: folderName,
      userId,
      NOT: {
        id: folderId,
      },
    },
  });
  return folder !== null;
};

export const deleteFolderByIdAndUserId = async (
  folderId: number,
  userId: number,
) => {
  await prisma.folder.delete({
    where: {
      id: folderId,
      userId,
    },
  });
};

export const createFilesWithFolderId = async (filesInput: FileInput[]) => {
  await prisma.file.createMany({
    data: filesInput,
  });
};

export const deleteFileByIdAndFolderId = async (
  fileId: number,
  folderId: number,
) => {
  const { fileName } = await prisma.file.delete({
    where: {
      id: fileId,
      folderId,
    },
    select: {
      fileName: true,
    },
  });
  return fileName;
};
