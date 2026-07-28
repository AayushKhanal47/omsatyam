import jwt from "jsonwebtoken";
import { Response } from "express";
import { getAuthCookieOptions } from "@/utils/authCookie";

export const generateToken = (res: Response, adminId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const token = jwt.sign({ id: adminId }, secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d",
  });

  res.cookie("token", token, {
    ...getAuthCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
