import { Router } from "express";
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } from "@/controllers/product.controller";
import { protect } from "@/middleware/auth.middleware";

const router = Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;