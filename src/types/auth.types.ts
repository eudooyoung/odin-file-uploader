import type { User } from "@/generated/prisma/client.js";

export type AuthUser = Pick<User, "id" | "username">;

export interface SignupBody {
  username: string;
  password: string;
  passwordConfirm: string;
}

export type CreateUserInput = Pick<User, "username" | "password">;
