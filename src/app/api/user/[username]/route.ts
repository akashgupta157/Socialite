import dbConnect from "@/db";
import userModel from "@/models/user.model";
import postModel from "@/models/post.model";
import { headers } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect();
    const Post = mongoose.models.Post || mongoose.model("Post", postModel);
    const user = await userModel
      .findOne({ username: params.username })
      .select("-password")
      .populate("posts")
      .populate("following")
      .populate("followers");
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const currentUser = await userModel.findOne({ username: payload.username });
    const targetUser = await userModel.findOne({ username: params.username });
    if (!currentUser || !targetUser) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    if (payload.username === params.username) {
      return NextResponse.json({
        message: "Cannot follow/unfollow yourself",
        success: false,
      });
    }
    const isFollowing = currentUser.following.includes(targetUser._id);
    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (userId: { toString: () => any }) =>
          userId.toString() !== targetUser._id.toString()
      );
      targetUser.followers = targetUser.followers.filter(
        (userId: { toString: () => any }) =>
          userId.toString() !== currentUser._id.toString()
      );
      await currentUser.save();
      await targetUser.save();
      return NextResponse.json({
        message: "Unfollowed successfully",
        success: true,
      });
    } else {
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);
      await currentUser.save();
      await targetUser.save();
      return NextResponse.json({
        message: "Followed successfully",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
