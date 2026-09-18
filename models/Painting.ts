import mongoose, { Schema } from "mongoose";

const PaintingSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    titleHe: String,
    imageUrl: String,
    imagePublicId: String,
    medium: String,
    dimensions: String,
    availability: String,
    description: String,
    quote: String,
    featured: Boolean,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PaintingModel =
  mongoose.models.Painting ?? mongoose.model("Painting", PaintingSchema);
