import { type Request, type Response, type NextFunction } from "express";
import { verifyFirebaseToken } from "../utils/verifyToken";

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

    const decoded = await verifyFirebaseToken(idToken);

    (req as any).user = {
      uid: decoded.uid || decoded.sub,
      email: decoded.email || "",
      emailVerified: decoded.email_verified || false,
      name: decoded.name || null,
      picture: decoded.picture || null,
    };

    next();
  } catch (error: any) {
    const message =
      error?.name === "TokenExpiredError" ||
      error?.code === "auth/id-token-expired"
        ? "Token expired. Please log in again."
        : `Invalid authentication token: ${error.message}`;

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
      const decoded = await verifyFirebaseToken(authHeader.split("Bearer ")[1]);
      (req as any).user = {
        uid: decoded.uid || decoded.sub,
        email: decoded.email || "",
        emailVerified: decoded.email_verified || false,
        name: decoded.name || null,
        picture: decoded.picture || null,
      };
    }
  } catch {
    // Token invalid — proceed without user
  }
  next();
};
