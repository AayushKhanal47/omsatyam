import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parent?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);