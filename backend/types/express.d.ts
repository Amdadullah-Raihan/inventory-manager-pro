import { type Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        emailVerified?: boolean;
        name?: string | null;
        picture?: string | null;
      };
    }
  }
}

export {};
