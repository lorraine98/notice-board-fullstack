import { Notice } from "../models/notice.schema";
import { connectDb } from "./connect-db";

connectDb();

export const getNotices = async () => {
  try {
    const notices = await Notice.find();

    return {
      notices,
    };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const getNotice = async (_id: string) => {
  try {
    const notice = await Notice.findOne({ _id });

    return {
      notice,
    };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const postNotice = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  try {
    const notice = new Notice({ title, body, date: Date.now() });
    await notice.save();

    return {
      status: 200,
      notice,
    };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const deleteNotice = async (_id: string) => {
  try {
    const { deletedCount } = await Notice.deleteOne({ _id });

    if (deletedCount === 0) {
      throw new Error("No document found");
    }

    return {
      status: 200,
    };
  } catch (error) {
    return { error, status: 500 };
  }
};

export const updateNotice = async (
  _id: string,
  title: string,
  body: string
) => {
  try {
    const { matchedCount } = await Notice.updateOne({ _id }, { title, body });

    if (matchedCount === 0) {
      throw new Error("No document found");
    }

    return {
      status: 200,
    };
  } catch (error) {
    return { error, status: 500 };
  }
};
