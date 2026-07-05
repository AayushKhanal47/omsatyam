import { Request, Response } from "express";
import { Admin } from "@/models/Admin.model";
import { generateToken } from "@/utils/generateToken";
import { registerAdminSchema, loginAdminSchema } from "@/utils/validation";
import { AuthRequest } from "@/middleware/auth.middleware";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const parsed = registerAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
    }

    const { name, email, password } = parsed.data;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An admin with this email already exists",
      });
    }

    const admin = await Admin.create({ name, email, password });
    generateToken(res, admin.id.toString());

    return res.status(201).json({
      success: true,
      data: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("registerAdmin error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const parsed = loginAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
    }

    const { email, password } = parsed.data;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    generateToken(res, admin.id.toString());

    return res.status(200).json({
      success: true,
      data: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("loginAdmin error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutAdmin = async (_req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  });
  return res.status(200).json({ success: true, message: "Logged out" });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const admin = await Admin.findById(req.admin?.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    return res.status(200).json({
      success: true,
      data: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
