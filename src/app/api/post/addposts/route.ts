import dbConnect from "@/db";
import postModel from "@/models/post.model";
import userModel from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const { content, attachments } = await req.json();
    const newPost = new postModel({
      user: payload.userId,
      content,
      attachments,
    });
    await newPost.save();
    const user = await userModel.findById(payload.userId);
    user.posts.push(newPost._id);
    await user.save();
    return NextResponse.json({
      message: "Post created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
};
