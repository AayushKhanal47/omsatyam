import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus, trackOrder, trackOrdersByPhone } from "@/controllers/order.controller";
import { protect } from "@/middleware/auth.middleware";
import { mongoRateLimit } from "@/utils/mongoRateLimit";

const router = Router();

const orderLimiter = mongoRateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many orders placed. Please try again later or contact us on WhatsApp.",
  keyPrefix: "order",
});

router.post("/", orderLimiter, createOrder);
router.get("/track-by-phone", trackOrdersByPhone);
router.get("/track/:id", trackOrder);
router.get("/", protect, getOrders);
router.put("/:id/status", protect, updateOrderStatus);

export default router;
