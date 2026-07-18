import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus, trackOrder, trackOrdersByPhone } from "@/controllers/order.controller";
import { protect } from "@/middleware/auth.middleware";
import rateLimit from "express-rate-limit";

const router = Router();

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many orders placed. Please try again later or contact us on WhatsApp." },
});

router.post("/", orderLimiter, createOrder);
router.get("/track-by-phone", trackOrdersByPhone);
router.get("/track/:id", trackOrder);
router.get("/", protect, getOrders);
router.put("/:id/status", protect, updateOrderStatus);

export default router;
