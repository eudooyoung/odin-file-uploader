import type { User } from "generated/prisma/client.js";

export type AuthUser = Pick<User, "id" | "username">;
