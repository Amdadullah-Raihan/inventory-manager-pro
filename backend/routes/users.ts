import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { getUser } from "../utils/getUser";

const router = Router();

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: getUser(req) });
});

export default router;
