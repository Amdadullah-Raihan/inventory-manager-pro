import { type Request, type Response, type NextFunction } from "express";
import { type ZodSchema, ZodError } from "zod";

type ValidationTarget = "body" | "query" | "params";

/**
 * Middleware factory that validates request data against a Zod schema.
 *
 * Usage:
 *   router.post("/new", validate(createProductSchema), productController.create);
 *   router.get("/", validate(paginationSchema, "query"), productController.list);
 */
export function validate(schema: ZodSchema, target: ValidationTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[target]);
      // Replace with parsed (coerced/transformed) data
      req[target] = data;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next({
          statusCode: 400,
          message: "Validation Error",
          details: err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      next(err);
    }
  };
}
