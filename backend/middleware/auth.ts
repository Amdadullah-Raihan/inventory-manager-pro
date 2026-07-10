import { type Request, type Response, type NextFunction } from "express";
import admin from "../config/firebaseAdmin";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let idToken: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      idToken = authHeader.split("Bearer ")[1];
    }

    if (!idToken && req.cookies?.__session) {
      idToken = req.cookies.__session;
    }

    if (!idToken) {
      res
        .status(401)
        .json({ success: false, error: "Authentication required" });
      return;
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    req.user = {
      uid: decoded.uid,
      email: decoded.email!,
      emailVerified: decoded.email_verified,
      name: decoded.name || null,
      picture: decoded.picture || null,
    };

    next();
  } catch (error: any) {
    const message =
      error?.code === "auth/id-token-expired"
        ? "Token expired. Please log in again."
        : "Invalid authentication token.";

    res.status(401).json({ success: false, error: message });
  }
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const decoded = await admin
        .auth()
        .verifyIdToken(authHeader.split("Bearer ")[1]);
      req.user = {
        uid: decoded.uid,
        email: decoded.email!,
        emailVerified: decoded.email_verified,
        name: decoded.name || null,
        picture: decoded.picture || null,
      };
    }
  } catch {
    // Token invalid — proceed without user
  }
  next();
};
