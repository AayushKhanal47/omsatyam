import "dotenv/config";
import app from "@/app";
import { connectDB } from "@/config/db";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  });
};

startServer();
