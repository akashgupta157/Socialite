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
    const hashtagRegex = /#\w+/g;
    const hashtagsArray = content.match(hashtagRegex);
    const newPost = new postModel({
      user: payload.userId,
      content,
      attachments,
      hashtags: hashtagsArray,
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

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const user = await userModel.findOne({ username: payload.username });
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    const posts = await postModel
      .find({ user: { $in: [...user.following, user._id] } })
      .populate("user", "profilePicture name username")
      .sort({ updatedAt: -1 });
    return NextResponse.json({ posts });
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
    const user = await userModel.findOne({ username: payload.username });
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    const { postId } = await request.json();
    const post = await postModel.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found", success: false });
    }
    const isLiked = post.likes.includes(user._id);
    if (isLiked) {
      post.likes = post.likes.filter(
        (userId: { toString: () => any }) =>
          userId.toString() !== user._id.toString()
      );
      await post.save();
      return NextResponse.json({
        message: "Post unliked successfully",
        success: true,
      });
    } else {
      post.likes.push(user._id);
      await post.save();
      return NextResponse.json({
        message: "Post liked successfully",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
