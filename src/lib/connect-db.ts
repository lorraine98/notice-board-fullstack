import { Mongoose, connect } from "mongoose";

const { DB_URL, DB_NAME } = process.env;

if (!DB_URL) {
  throw new Error("Please add your MongoDB URI to .env");
}

let _dbConnCache: Mongoose | null = null;

export const connectDb = async () => {
  try {
    if (_dbConnCache) {
      console.log("🎉 cache connection used");
      return _dbConnCache;
    }
    _dbConnCache = await connect(DB_URL, {
      dbName: DB_NAME,
    });
    console.log("✅ New connection established");
    return _dbConnCache;
  } catch (error) {
    console.error("❌ Connection to database failed");
    throw error;
  }
};
