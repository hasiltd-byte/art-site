import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { hashPassword, setSession } from "@/lib/auth";
import { UserModel } from "@/models/User";

export async function POST(request: Request) {
  const { name = "", email, password } = await request.json();
  if (typeof email !== "string" || !email.includes("@") || typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "Enter a valid email and a password of at least 8 characters." }, { status: 400 });
  }
  await connectMongo();
  try {
    const user = await UserModel.create({ name, email: email.trim().toLowerCase(), passwordHash: await hashPassword(password) });
    await setSession(String(user._id));
    return NextResponse.json({ user: { name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === 11000) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    throw error;
  }
}