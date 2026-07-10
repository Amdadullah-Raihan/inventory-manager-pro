import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: req.user });
});

export default router;
