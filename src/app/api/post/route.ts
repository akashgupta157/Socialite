import dbConnect from "@/db";
import postModel from "@/models/post.model";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export const POST = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken)!;
    const { content } = await req.json();
    postModel.create({
      user: payload.userId,
      content,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
};
