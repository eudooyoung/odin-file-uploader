import { prisma } from "@/lib/prisma.js";

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  return user;
};

export const findAuthUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { id: true, username: true },
  });
  return user;
};
