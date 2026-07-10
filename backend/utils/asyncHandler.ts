import { type Request, type Response, type NextFunction } from "express";

type AsyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => (req: Request, res: Response, next: NextFunction) => void;

export const asyncHandler: AsyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
