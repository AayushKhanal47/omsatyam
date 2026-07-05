import { Router } from "express";
import { registerAdmin, loginAdmin, logoutAdmin, getMe } from "@/controllers/auth.controller";
import { protect } from "@/middleware/auth.middleware";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protect, getMe);

export default router;