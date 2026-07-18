import { Request, Response } from "express";
import { Product } from "@/models/Product.model";
import { createProductSchema, updateProductSchema } from "@/utils/validation";
import { slugify } from "@/utils/slugify";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = { isActive: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.$text = { $search: req.query.search as string };

    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    if (req.query.sort === "price_asc") sortOption = { price: 1 };
    if (req.query.sort === "price_desc") sortOption = { price: -1 };
    if (req.query.sort === "name_asc") sortOption = { name: 1 };

    const [products, total] = await Promise.all([
      Product.find(filter).populate("category", "name slug").sort(sortOption).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("getProducts error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate("category", "name slug");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("getProductBySlug error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.issues[0].message });
    }

    const data = parsed.data;
    let slug = slugify(data.name);

    const existingSlug = await Product.findOne({ slug });
    if (existingSlug) slug = `${slug}-${Date.now()}`;

    const product = await Product.create({ ...data, slug });
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("createProduct error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.issues[0].message });
    }

    const updateData: Record<string, any> = { ...parsed.data };
    if (typeof updateData.stock === "number") {
      updateData.inStock = updateData.stock > 0;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("updateProduct error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("deleteProduct error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
