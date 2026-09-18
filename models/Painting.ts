import mongoose, { Schema } from "mongoose";

const PaintingSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    titleHe: String,
    imageUrl: { type: String, required: true },
    imagePublicId: String,
    medium: { type: String, required: true },
    dimensions: { type: String, required: true },
    availability: { type: String, required: true },
    description: { type: String, required: true },
    quote: String,
    featured: Boolean,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PaintingModel =
  mongoose.models.Painting ?? mongoose.model("Painting", PaintingSchema);
