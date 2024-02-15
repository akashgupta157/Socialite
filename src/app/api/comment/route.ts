import dbConnect from "@/db";
import commentModel from "@/models/comment.model";
import userModel from "@/models/user.model";
import postModel from "@/models/post.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const { postId, content } = await request.json();
    const user = await userModel.findOne({ username: payload.username });
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found", success: false });
    }
    const newComment = new commentModel({
      user: user._id,
      post: post._id,
      content,
    });
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();
    return NextResponse.json({ success: true, comment: newComment });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
