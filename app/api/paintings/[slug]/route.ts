import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { connectMongo } from "@/lib/mongoose";
import { PaintingModel } from "@/models/Painting";
import { requireAdmin } from "@/lib/auth";

const editableFields = ["slug", "title", "titleHe", "imageUrl", "imagePublicId", "imageWidth", "imageHeight", "medium", "dimensions", "availability", "description", "quote", "featured", "order"] as const;

async function deleteCloudinaryAsset(publicId: string | undefined) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!publicId || !cloudName || !apiKey || !apiSecret) return false;

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1").update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("timestamp", String(timestamp));
  formData.append("api_key", apiKey);
  formData.append("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, { method: "POST", body: formData });
  return response.ok;
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

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  await connectMongo();
  const { slug } = await params;
  const painting = await PaintingModel.findOne({ slug }).lean() as { imagePublicId?: string } | null;
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
  const painting = await PaintingModel.findOne({ slug }).lean() as { imagePublicId?: string } | null;
  if (!painting) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await PaintingModel.deleteOne({ slug });
  const cloudinaryDeleted = await deleteCloudinaryAsset(painting.imagePublicId);
  return NextResponse.json({ deleted: true, cloudinaryDeleted });
}
