import dbConnect from "@/db";
import postModel from "@/models/post.model";
import commentModel from "@/models/comment.model";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
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
    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
