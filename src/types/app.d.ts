import type { AuthUser } from "@/features/auth/auth.types.js";

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export {};
