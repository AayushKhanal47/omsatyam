import { Request, Response } from "express";
import { Order } from "@/models/Order.model";
import { Product } from "@/models/Product.model";
import { createOrderSchema, MAX_QTY_PER_ITEM } from "@/utils/validation";
import { sendTelegramNotification, sendEmailNotification } from "@/utils/notify";
import { verifyTurnstile } from "@/utils/turnstile";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.issues[0].message });
    }

    const { customerName, clinicName, phone, address, items, notes, website, turnstileToken } = parsed.data;

    // Honeypot: the hidden "website" field is only ever filled in by bots. Pretend it worked.
    if (website) {
      return res.status(201).json({ success: true, data: null });
    }

    if (!(await verifyTurnstile(turnstileToken, req.ip))) {
      return res.status(400).json({ success: false, message: "Please complete the verification and try again." });
    }

    // Merge repeated lines for the same product so the per-item cap can't be sidestepped.
    const merged = new Map<string, number>();
    for (const item of items) merged.set(item.product, (merged.get(item.product) ?? 0) + item.quantity);

    const orderItems = [];
    let totalAmount = 0;

    for (const [productId, quantity] of merged) {
      if (quantity > MAX_QTY_PER_ITEM) {
        return res.status(400).json({
          success: false,
          message: `You can order up to ${MAX_QTY_PER_ITEM} of each product online. Contact us for larger quantities.`,
        });
      }
      const product = await Product.findOne({ _id: productId, isActive: true });
      if (!product) {
        return res.status(404).json({ success: false, message: "One of the products in your cart is no longer available." });
      }
      totalAmount += product.price * quantity;
      orderItems.push({
        product: product.id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    const order = await Order.create({
      customerName,
      clinicName,
      phone,
      address,
      items: orderItems,
      totalAmount,
      notes,
    });

    sendTelegramNotification(order).catch((e) => console.error(e));
    sendEmailNotification(order).catch((e) => console.error(e));

    return res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("createOrder error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);
    const skip = (page - 1) * limit;

const filter: Record<string, any> = {};
if (req.query.status) filter.status = req.query.status;
if (typeof req.query.search === "string" && req.query.search) {
  const escaped = req.query.search.slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const searchRegex = new RegExp(escaped, "i");
  filter.$or = [{ customerName: searchRegex }, { phone: searchRegex }, { clinicName: searchRegex }];
}

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("getOrders error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const trackOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { phone } = req.query;

    if (typeof phone !== "string" || !phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    const order = await Order.findById(id);

    if (!order || order.phone.replace(/\s+/g, "") !== phone.replace(/\s+/g, "")) {
      return res.status(404).json({ success: false, message: "Order not found. Check your Order ID and phone number." });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("trackOrder error:", error);
    return res.status(404).json({ success: false, message: "Order not found. Check your Order ID and phone number." });
  }
};

export const trackOrdersByPhone = async (req: Request, res: Response) => {
  try {
    const { phone } = req.query;

    if (typeof phone !== "string" || phone.trim().length < 7) {
      return res.status(400).json({ success: false, message: "Enter a valid phone number" });
    }

    const cleaned = phone.replace(/\s+/g, "");
    const orders = await Order.find({ phone: cleaned })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("trackOrdersByPhone error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error("deleteOrder error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};