import { Request, Response } from "express";
import { Order } from "@/models/Order.model";
import { Product } from "@/models/Product.model";
import { createOrderSchema } from "@/utils/validation";
import { sendTelegramNotification, sendEmailNotification } from "@/utils/notify";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.issues[0].message });
    }

    const { customerName, phone, address, items, notes } = parsed.data;

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      }
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      orderItems.push({
        product: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      customerName,
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
    const filter: Record<string, any> = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: orders });
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
