import mongoose from "mongoose";

// Cache the connection across serverless invocations. On Vercel each function
// instance may handle many requests; without caching we would open a new
// connection on every cold start and exhaust the Atlas connection pool.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

const cache: MongooseCache =
  globalWithMongoose._mongooseCache || { conn: null, promise: null };

globalWithMongoose._mongooseCache = cache;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cache.conn) {
    return cache.conn;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri).then((m) => {
      console.log(`MongoDB connected: ${m.connection.host}`);
      return m;
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    console.error("MongoDB connection failed:", error);
    throw error;
  }

  return cache.conn;
};
