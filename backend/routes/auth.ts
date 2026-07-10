import { Router, type Request, type Response } from "express";
import admin from "../config/firebaseAdmin";

const router = Router();

// POST /api/auth/session
router.post("/session", async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res
        .status(400)
        .json({ success: false, error: "ID token is required" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    res.cookie("__session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn,
    });

    res.status(200).json({
      success: true,
      data: {
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name || null,
      },
    });
  } catch {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
});

// DELETE /api/auth/session
router.delete("/session", (_req: Request, res: Response) => {
  res.clearCookie("__session", { path: "/" });
  res.status(200).json({ success: true, message: "Logged out" });
});

export default router;
