import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? process.env.MONGO_URI;

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: Cache | undefined;
}

const cache: Cache = global.__mongooseCache ?? { conn: null, promise: null };
if (!global.__mongooseCache) global.__mongooseCache = cache;

export async function connectMongo() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "zvi-aharon-art",
      bufferCommands: false,
    });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
