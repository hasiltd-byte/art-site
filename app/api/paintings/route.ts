import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { PaintingModel } from "@/models/Painting";

const requiredFields = ["slug", "title", "imageUrl", "medium", "dimensions", "availability", "description"] as const;

function paintingPayload(input: Record<string, unknown>) {
  const payload = Object.fromEntries(
    ["slug", "title", "titleHe", "imageUrl", "imagePublicId", "medium", "dimensions", "availability", "description", "quote", "featured", "order"]
      .filter((field) => input[field] !== undefined)
      .map((field) => [field, input[field]])
  );
  const missing = requiredFields.filter((field) => !payload[field]);
  return { payload, missing };
}

export async function GET() {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ mode: "local", message: "MongoDB mode is disabled." });
  await connectMongo();
  const paintings = await PaintingModel.find().sort({ order: 1 }).lean();
  return NextResponse.json(paintings);
}

export async function POST(request: Request) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  await connectMongo();
  const input = await request.json();
  const { payload, missing } = paintingPayload(input);
  if (missing.length) return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  try {
    const painting = await PaintingModel.create(payload);
    return NextResponse.json(painting, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof Error && "code" in error && error.code === 11000) return NextResponse.json({ error: "A painting with this slug already exists." }, { status: 409 });
    throw error;
  }
}
