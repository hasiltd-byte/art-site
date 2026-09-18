import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { PaintingModel } from "@/models/Painting";

const editableFields = ["slug", "title", "titleHe", "imageUrl", "imagePublicId", "medium", "dimensions", "availability", "description", "quote", "featured", "order"] as const;

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  await connectMongo();
  const { slug } = await params;
  const painting = await PaintingModel.findOne({ slug }).lean();
  return painting ? NextResponse.json(painting) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  await connectMongo();
  const { slug } = await params;
  const input = await request.json();
  const payload = Object.fromEntries(editableFields.filter((field) => input[field] !== undefined).map((field) => [field, input[field]]));
  const painting = await PaintingModel.findOneAndUpdate({ slug }, { $set: payload }, { new: true, runValidators: true }).lean();
  return painting ? NextResponse.json(painting) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  await connectMongo();
  const { slug } = await params;
  await PaintingModel.deleteOne({ slug });
  return new NextResponse(null, { status: 204 });
}
