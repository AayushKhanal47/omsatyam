import { Router } from "express";
import { protect } from "@/middleware/auth.middleware";
import { registerAdmin, loginAdmin, logoutAdmin, getMe, changePassword, updateProfile } from "@/controllers/auth.controller";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);
router.put("/profile", protect, updateProfile);

export default router;