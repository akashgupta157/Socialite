import dbConnect from "@/db";
import userModel from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    await dbConnect();
    const headersInstance = headers();
    const BearerToken = headersInstance.get("authorization")?.split(" ")[1]!;
    const payload = jwt.decode(BearerToken) as JwtPayload;
    const { profilePicture, name, bio } = await request.json();
    const user = await userModel
      .findOne({ username: payload.username })
      .select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }
    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    await user.save();
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
