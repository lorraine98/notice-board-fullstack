import { Notice } from "../models/notice.schema";
import { connectDb } from "./connect-db";

export const getNotices = async () => {
  await connectDb();
  const notices = await Notice.find();

  return { notices };
};

export const getNotice = async (_id: string) => {
  await connectDb();
  const notice = await Notice.findOne({ _id });

  return { notice };
};

export const postNotice = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  await connectDb();
  const notice = new Notice({ title, body, date: Date.now() });
  await notice.save();

  return { notice };
};

export const deleteNotice = async (_id: string) => {
  await connectDb();
  const { deletedCount } = await Notice.deleteOne({ _id });

  if (deletedCount === 0) {
    throw new Error("No document found");
  }
};

export const updateNotice = async ({
  _id,
  title,
  body,
}: {
  _id: string;
  title: string;
  body: string;
}) => {
  await connectDb();
  const { matchedCount } = await Notice.updateOne({ _id }, { title, body });

  if (matchedCount === 0) {
    throw new Error("No document found");
  }
};
