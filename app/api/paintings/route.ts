import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { PaintingModel } from "@/models/Painting";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `painting-${Date.now()}`;
}

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

function paintingPayload(input: Record<string, unknown>) {
  const payload = Object.fromEntries(
    ["slug", "title", "titleHe", "imageUrl", "imagePublicId", "imageWidth", "imageHeight", "medium", "dimensions", "availability", "description", "quote", "featured", "order"]
      .filter((field) => input[field] !== undefined)
      .map((field) => [field, input[field]])
  );
  if (typeof payload.title === "string" && payload.title.trim()) {
    const title = payload.title.trim();
    payload.title = title;
    payload.slug = typeof payload.slug === "string" && payload.slug.trim() ? slugify(payload.slug) : slugify(title);
  }
  if (payload.imageUrl !== undefined) payload.imageUrl = cleanImageUrl(payload.imageUrl);
  return { payload };
}

export async function GET() {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ mode: "local", message: "MongoDB mode is disabled." });
  await connectMongo();
  const paintings = await PaintingModel.find().sort({ order: 1 }).lean();
  return NextResponse.json(paintings);
}

export async function POST(request: Request) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  if (!await requireAdmin()) return NextResponse.json({ error: "Admin access is required." }, { status: 403 });
  await connectMongo();
  const input = await request.json();
  let payload: Record<string, unknown>;
  try {
    payload = paintingPayload(input).payload;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid image URL." }, { status: 400 });
  }
  if (typeof payload.title !== "string" || !payload.title.trim()) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  try {
    const painting = await PaintingModel.create(payload);
    return NextResponse.json(painting, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof Error && "code" in error && error.code === 11000) return NextResponse.json({ error: "A painting with this slug already exists." }, { status: 409 });
    throw error;
  }
}
