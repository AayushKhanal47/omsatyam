import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus, trackOrder } from "@/controllers/order.controller";
import { protect } from "@/middleware/auth.middleware";

const router = Router();

router.post("/", createOrder);
router.get("/track/:id", trackOrder);
router.get("/", protect, getOrders);
router.put("/:id/status", protect, updateOrderStatus);

export default router;
