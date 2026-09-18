import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { PaintingModel } from "@/models/Painting";
import { requireAdmin } from "@/lib/auth";

const editableFields = ["slug", "title", "titleHe", "imageUrl", "imagePublicId", "medium", "dimensions", "availability", "description", "quote", "featured", "order"] as const;

function cleanImageUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const imageUrl = value.trim();
  if (imageUrl.startsWith("/")) return imageUrl;
  const parsed = new URL(imageUrl);
  if (parsed.protocol !== "https:" || parsed.hostname !== "res.cloudinary.com") throw new Error("Image URL must be a Cloudinary URL.");
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString();
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  await connectMongo();
  const { slug } = await params;
  const painting = await PaintingModel.findOne({ slug }).lean();
  return painting ? NextResponse.json(painting) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  if (!await requireAdmin()) return NextResponse.json({ error: "Admin access is required." }, { status: 403 });
  await connectMongo();
  const { slug } = await params;
  const input = await request.json();
  let payload: Record<string, unknown>;
  try {
    payload = Object.fromEntries(editableFields.filter((field) => input[field] !== undefined).map((field) => [field, field === "imageUrl" ? cleanImageUrl(input[field]) : input[field]]));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid image URL." }, { status: 400 });
  }
  const painting = await PaintingModel.findOneAndUpdate({ slug }, { $set: payload }, { new: true, runValidators: true }).lean();
  return painting ? NextResponse.json(painting) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  if (!await requireAdmin()) return NextResponse.json({ error: "Admin access is required." }, { status: 403 });
  await connectMongo();
  const { slug } = await params;
  await PaintingModel.deleteOne({ slug });
  return new NextResponse(null, { status: 204 });
}
