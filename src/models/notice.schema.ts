import mongoose, { Schema } from "mongoose";

export const NoticeSchema = new Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
});

export const Notice =
  mongoose.models.Notice ?? mongoose.model("Notice", NoticeSchema);
