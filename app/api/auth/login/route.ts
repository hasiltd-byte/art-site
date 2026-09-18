import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import { setSession, verifyPassword } from "@/lib/auth";
import { UserModel } from "@/models/User";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  await connectMongo();
  const user = typeof email === "string" ? await UserModel.findOne({ email: email.trim().toLowerCase() }) : null;
  if (!user || typeof password !== "string" || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }
  await setSession(String(user._id));
  return NextResponse.json({ user: { name: user.name, email: user.email, role: user.role } });
}