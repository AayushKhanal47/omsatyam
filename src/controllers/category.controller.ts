import { Request, Response } from "express";
import { Category } from "@/models/Category.model";
import { createCategorySchema } from "@/utils/validation";
import { slugify } from "@/utils/slugify";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("getCategories error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.issues[0].message });
    }

    const { name, description, parent } = parsed.data;
    const slug = slugify(name);

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(409).json({ success: false, message: "A category with this name already exists" });
    }

    const category = await Category.create({ name, slug, description, parent: parent || null });
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error("createCategory error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("deleteCategory error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
