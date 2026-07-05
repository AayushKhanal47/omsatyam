import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus } from "@/controllers/order.controller";
import { protect } from "@/middleware/auth.middleware";

const router = Router();

router.post("/", createOrder); // public — anyone can place an order
router.get("/", protect, getOrders); // admin only
router.put("/:id/status", protect, updateOrderStatus); // admin only

export default router;