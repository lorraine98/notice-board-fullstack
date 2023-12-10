import _mongoose, { connect } from "mongoose";

const { DB_URL, DB_NAME } = process.env;

if (!DB_URL) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

export const connectDb = async () => {
  try {
    const connection = await connect(DB_URL, {
      dbName: DB_NAME,
    });
    console.log("✅ New connection established");
    return connection;
  } catch (error) {
    console.error("❌ Connection to database failed");
    throw error;
  }
};
