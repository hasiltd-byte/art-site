import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { PaintingModel } from "@/models/Painting";

export async function GET() {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ mode: "local", message: "MongoDB mode is disabled." });
  await connectMongo();
  const paintings = await PaintingModel.find().sort({ order: 1 }).lean();
  return NextResponse.json(paintings);
}

export async function POST(request: Request) {
  if (process.env.PAINTING_DATA_SOURCE !== "mongodb") return NextResponse.json({ error: "MongoDB mode is disabled." }, { status: 409 });
  await connectMongo();
  const payload = await request.json();
  const painting = await PaintingModel.create(payload);
  return NextResponse.json(painting, { status: 201 });
}
