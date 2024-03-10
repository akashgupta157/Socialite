import dbConnect from "@/db";
import userModel from "@/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

    let posts;
    let suggestedUsers = [];

    suggestedUsers = await userModel
      .aggregate([
        { $match: { _id: { $ne: user._id } } },
        { $sample: { size: 5 } },
      ])
      .project({ _id: 1, name: 1, username: 1, profilePicture: 1 });

    return NextResponse.json({ posts, suggestedUsers });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
