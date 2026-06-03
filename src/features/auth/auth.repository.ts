import { prisma } from "@/lib/prisma.js";
import type { CreateUserInput } from "./auth.types.js";

export const createUser = async ({ username, password }: CreateUserInput) => {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
};
