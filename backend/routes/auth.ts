import { Router, type Request, type Response } from "express";
import { verifyFirebaseToken } from "../utils/verifyToken";

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

    // Verify the token is valid before storing it
    const decoded = await verifyFirebaseToken(idToken);

    // Store the original ID token as the session cookie
    // The auth middleware will verify it on every request using public keys
    const maxAge = 60 * 60 * 24 * 5 * 1000; // 5 days

    res.cookie("__session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    res.status(200).json({
      success: true,
      data: {
        uid: decoded.uid || decoded.sub,
        email: decoded.email,
        name: decoded.name || null,
      },
    });
  } catch (err: any) {
    res
      .status(401)
      .json({ success: false, error: err.message || "Invalid token" });
  }
});

// DELETE /api/auth/session
router.delete("/session", (_req: Request, res: Response) => {
  res.clearCookie("__session", { path: "/" });
  res.status(200).json({ success: true, message: "Logged out" });
});

export default router;
