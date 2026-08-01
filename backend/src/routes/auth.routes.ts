import { Router } from "express";
import { registerAdmin, loginAdmin, logoutAdmin, getMe, changePassword, updateProfile } from "@/controllers/auth.controller";
import { protect } from "@/middleware/auth.middleware";
import { mongoRateLimit } from "@/utils/mongoRateLimit";

const router = Router();

const authLimiter = mongoRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many attempts, please try again later",
  keyPrefix: "auth",
});

router.post("/register", authLimiter, protect, registerAdmin);
router.post("/login", authLimiter, loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);
router.put("/profile", protect, updateProfile);

export default router;
