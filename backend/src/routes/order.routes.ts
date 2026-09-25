import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus, deleteOrder, trackOrder, trackOrdersByPhone } from "@/controllers/order.controller";
import { protect } from "@/middleware/auth.middleware";
import { mongoRateLimit } from "@/utils/mongoRateLimit";

const router = Router();

const orderLimiter = mongoRateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many orders placed. Please try again later or contact us on WhatsApp.",
  keyPrefix: "order",
});

const trackLimiter = mongoRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many tracking attempts. Please try again in a few minutes.",
  keyPrefix: "track",
});

router.post("/", orderLimiter, createOrder);
router.get("/track-by-phone", trackLimiter, trackOrdersByPhone);
router.get("/track/:id", trackLimiter, trackOrder);
router.get("/", protect, getOrders);
router.put("/:id/status", protect, updateOrderStatus);
router.delete("/:id", protect, deleteOrder);

export default router;
