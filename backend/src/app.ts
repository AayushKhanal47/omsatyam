import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "@/routes/auth.routes";
import productRoutes from "@/routes/product.routes";
import categoryRoutes from "@/routes/category.routes";
import orderRoutes from "@/routes/order.routes";

const app = express();

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

app.use(express.json());
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
