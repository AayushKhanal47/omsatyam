import { Router } from "express";
import { getCategories, createCategory, deleteCategory } from "@/controllers/category.controller";
import { protect } from "@/middleware/auth.middleware";

const router = Router();

router.get("/", getCategories);
router.post("/", protect, createCategory);
router.delete("/:id", protect, deleteCategory);

export default router;