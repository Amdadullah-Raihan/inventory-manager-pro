import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { invoiceController } from "../controllers/invoiceController";
import { createInvoiceSchema, paginationSchema } from "../validators/schemas";

const router = Router();

router.use(authMiddleware);

// Static routes first
router.get("/latest/invoiceNumber", invoiceController.getLatestNumber);
router.get(
  "/list",
  validate(paginationSchema, "query"),
  invoiceController.list,
);
router.post("/new", validate(createInvoiceSchema), invoiceController.create);
router.delete("/delete/many", invoiceController.deleteMany);

// Sales data
router.get("/sales/:timeInterval", invoiceController.getSales);

// Parameterized routes
router.get("/:id", invoiceController.getById);
router.delete("/:id", invoiceController.delete);

export default router;
