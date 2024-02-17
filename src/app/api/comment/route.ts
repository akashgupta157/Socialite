import dbConnect from "@/db";
import { headers } from "next/headers";
import postModel from "@/models/post.model";
import userModel from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import commentModel from "@/models/comment.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const { postId, content } = await request.json();
    const post = await postModel.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found", success: false });
    }
    const newComment = new commentModel({
      user: payload.userId,
      post: post._id,
      content,
    });
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();
    return NextResponse.json({
      success: true,
      comment: newComment,
      message: "Comment created successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const { action, commentId } = await request.json();
    const comment = await commentModel.findById(commentId);
    if (action === "like") {
      const isLiked = comment.likes.includes(payload.userId);
      if (isLiked) {
        comment.likes = comment.likes.filter(
          (userId: { toString: () => any }) =>
            userId.toString() !== payload.userId
        );
        await comment.save();
        return NextResponse.json({
          message: "Comment unliked successfully",
          success: true,
        });
      } else {
        comment.likes.push(payload.userId);
        await comment.save();
        return NextResponse.json({
          message: "Comment liked successfully",
          success: true,
        });
      }
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
