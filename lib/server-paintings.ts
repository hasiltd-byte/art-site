import { seedPaintings } from "@/data/paintings";
import { connectMongo } from "@/lib/mongoose";
import { PaintingModel } from "@/models/Painting";
import type { Painting } from "@/types/painting";

export async function getServerPaintings(): Promise<Painting[]> {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return seedPaintings;
  await connectMongo();
  const docs = await PaintingModel.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(docs)) as Painting[];
}

export async function getServerPainting(slug: string): Promise<Painting | null> {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") {
    return seedPaintings.find((item) => item.slug === slug) ?? null;
  }
  await connectMongo();
  const doc = await PaintingModel.findOne({ slug }).lean();
  return doc ? (JSON.parse(JSON.stringify(doc)) as Painting) : null;
}
