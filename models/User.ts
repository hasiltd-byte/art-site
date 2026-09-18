import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User ?? mongoose.model("User", UserSchema);