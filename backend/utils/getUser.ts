import { type Request } from "express";

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified?: boolean;
  name?: string | null;
  picture?: string | null;
}

/** Get the authenticated user from the request. Throws if not authenticated. */
export function getUser(req: Request): AuthUser {
  const user = (req as any).user;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user;
}
