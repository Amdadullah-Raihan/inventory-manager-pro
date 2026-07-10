import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { productController } from "../controllers/productController";
import {
  createProductSchema,
  updateProductSchema,
  paginationSchema,
} from "../validators/schemas";

const router = Router();

router.use(authMiddleware);

router.get("/", validate(paginationSchema, "query"), productController.list);
router.post("/new", validate(createProductSchema), productController.create);
router.get("/:id", productController.getById);
router.put("/:id", validate(updateProductSchema), productController.update);
router.delete("/delete/many", productController.deleteMany);
router.delete("/:id", productController.delete);

export default router;
