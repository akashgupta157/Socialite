import dbConnect from "@/db";
import postModel from "@/models/post.model";
import commentModel from "@/models/comment.model";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await dbConnect();
    const post = await postModel
      .findById(params.postId)
      .populate("user", ["name", "username", "profilePicture"])
      .populate({
        path: "likes",
        model: "User",
        select: ["name", "username"],
      })
      .populate({
        path: "comments",
        model: commentModel,
        populate: {
          path: "user",
          model: "User",
          select: ["name", "username", "profilePicture"],
        },
      });
    if (!post) {
      return NextResponse.json({ message: "Post not found", success: false });
    }
    post.comments.reverse();
    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const post = await postModel.findById(params.postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found", success: false });
    }
    if (post.user.toString() !== payload.userId) {
      return NextResponse.json({ message: "Unauthorized", success: false });
    }
    await postModel.deleteOne({ _id: params.postId });
    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
