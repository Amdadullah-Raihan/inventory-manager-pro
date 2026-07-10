import { type Request, type Response, type NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  details?: unknown;
  code?: number;
  keyValue?: Record<string, unknown>;
  path?: string;
  value?: unknown;
  errors?: Record<string, { message: string }>;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error("[Error]", err.message || err);

  if (err.name === "ValidationError" && err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message);
    res
      .status(400)
      .json({ success: false, error: "Validation Error", details: messages });
    return;
  }

  if (err.code === 11000 && err.keyValue) {
    const field = Object.keys(err.keyValue).join(", ");
    res
      .status(409)
      .json({ success: false, error: `Duplicate value for: ${field}` });
    return;
  }

  if (err.name === "CastError") {
    res
      .status(400)
      .json({ success: false, error: `Invalid ${err.path}: ${err.value}` });
    return;
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(err.details && { details: err.details }),
  });
};
