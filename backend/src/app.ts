import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import authRoutes from "@/routes/auth.routes";
import productRoutes from "@/routes/product.routes";
import categoryRoutes from "@/routes/category.routes";
import orderRoutes from "@/routes/order.routes";

const app = express();

// Behind Vercel's proxy: use the client IP from X-Forwarded-For so rate limits apply per visitor.
app.set("trust proxy", 1);

app.use(helmet());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "200kb" }));

// Broad per-IP cap on the whole API; stricter limits sit on login, orders and tracking.
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    skip: (req) => req.path === "/health",
    message: { success: false, message: "Too many requests. Please slow down and try again shortly." },
  })
);
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
