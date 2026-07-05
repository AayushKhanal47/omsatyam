import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (res: Response, adminId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const token = jwt.sign({ id: adminId }, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // JS can't read this cookie — protects against XSS token theft
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};