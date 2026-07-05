import nodemailer from "nodemailer";
import { IOrder } from "@/models/Order.model";

// Sends an instant Telegram message to you when a new order comes in
export const sendTelegramNotification = async (order: IOrder): Promise<void> => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram not configured, skipping notification");
    return;
  }

  const itemsList = order.items
    .map((item) => `- ${item.name} x${item.quantity} (Rs. ${item.price})`)
    .join("\n");

  const message = `🦷 New Order!\n\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nAddress: ${order.address}\n\nItems:\n${itemsList}\n\nTotal: Rs. ${order.totalAmount}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
  } catch (error) {
    console.error("Telegram notification failed:", error);
  }
};

// Sends a backup email when a new order comes in
export const sendEmailNotification = async (order: IOrder): Promise<void> => {
  const { EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !ADMIN_EMAIL) {
    console.warn("Email not configured, skipping notification");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const itemsHtml = order.items
    .map((item) => `<li>${item.name} x${item.quantity} — Rs. ${item.price}</li>`)
    .join("");

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New Order from ${order.customerName}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total: Rs. ${order.totalAmount}</strong></p>
      `,
    });
  } catch (error) {
    console.error("Email notification failed:", error);
  }
};