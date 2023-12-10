import {
  getNotices,
  postNotice,
  deleteNotice,
  updateNotice,
} from "@/src/lib/notice-db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await getNotices();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, body } = await request.json();
    const data = await postNotice({ title, body });
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const _id = searchParams.get("_id");

    if (!_id) {
      return Response.json({ error: "_id is required" });
    }

    const data = await deleteNotice(_id);

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const _id = searchParams.get("_id");

    if (!_id) {
      return Response.json({ error: "_id is required" });
    }

    const { title, body } = await request.json();
    const data = await updateNotice({ _id, title, body });

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
