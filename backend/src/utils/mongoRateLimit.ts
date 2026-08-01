import { Schema, model } from "mongoose";
import { Request, Response, NextFunction } from "express";

interface IRateLimitHit {
  key: string;
  createdAt: Date;
}

const rateLimitSchema = new Schema<IRateLimitHit>({
  key: { type: String, required: true, index: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 3600 },
});

const RateLimitHit = model<IRateLimitHit>("RateLimitHit", rateLimitSchema);

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
  keyPrefix: string;
}

export const mongoRateLimit = (options: RateLimitOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `${options.keyPrefix}:${req.ip}`;
      const windowStart = new Date(Date.now() - options.windowMs);

      const count = await RateLimitHit.countDocuments({
        key,
        createdAt: { $gte: windowStart },
      });

      if (count >= options.max) {
        return res.status(429).json({ success: false, message: options.message });
      }

      await RateLimitHit.create({ key });
      next();
    } catch (error) {
      console.error("mongoRateLimit error:", error);
      next();
    }
  };
};
